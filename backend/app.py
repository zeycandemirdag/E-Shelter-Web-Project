from flask import Flask, request, session, redirect, url_for, jsonify
import psycopg2 # pip install psycopg2
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from psycopg2 import sql
from datetime import date, datetime
app = Flask(__name__)
app.secret_key = "super secret key"
CORS(app)

usernameLogin= ""

try:
    conn = psycopg2.connect(database="E-ShelterDB",  
                            user="postgres", 
                            password="1107",  
                            host="localhost", port="5432") 
    cur = conn.cursor()
    print("Database connection successful.")
except Exception as e:
    print(f"Error connecting to the database: {e}")

@app.route('/showanimals', methods=['GET'])
def showanimals():
    try:
        # Fetch all data from the animal, medical_history, animal_photos, and veterinary tables
        cur.execute("SELECT * FROM animal WHERE status = FALSE")
        pets_data = cur.fetchall()

        cur.execute("SELECT * FROM medical_history")
        medical_data = cur.fetchall()

        cur.execute("SELECT * FROM animal_photos")
        photos_data = cur.fetchall()

        cur.execute("SELECT * FROM veterinary")
        veterinary_data = cur.fetchall()

        if pets_data:
            pets_list = []
            photos_dict = {row[0]: row[1] for row in photos_data}  # animal_id -> photo_data
            medical_dict = {row[0]: {
                'vetId': row[1],
                'medication': row[2],
                'height': row[3],
                'weight': row[4],
                'medicalCondition': row[5],
                'note': row[6]
            } for row in medical_data}  # med_id -> {vetId, medication, height, weight, medicalCondition, note}
            veterinary_dict = {row[0]: {
                'clinicName': row[1],
                'vetName': row[2],
                'vetSurname': row[3]
            } for row in veterinary_data}  # vet_id -> {clinicName, vetName, vetSurname}

            for row in pets_data:
                animalId = row[0]
                medId = row[1]

                pet_dict = {
                    'animalId': animalId,
                    'medId': medId,
                    'animalName': row[2],
                    'status': row[3],
                    'age': row[4],
                    'genus': row[5],
                    'gender': row[6],
                }

                # Add photo data to pet_dict if available
                if animalId in photos_dict:
                    pet_dict['photo'] = photos_dict[animalId]

                # Add medical history data to pet_dict if available
                if medId in medical_dict:
                    med_history = medical_dict[medId]
                    vetId = med_history['vetId']

                    med_history_data = {
                        'medication': med_history['medication'],
                        'height': med_history['height'],
                        'weight': med_history['weight'],
                        'medicalCondition': med_history['medicalCondition'],
                        'note': med_history['note'],
                        'veterinary': veterinary_dict.get(vetId, {})
                    }
                    pet_dict['medical_history'] = med_history_data

                pets_list.append(pet_dict)

            return jsonify({
                'pets': pets_list,
            }), 200

        else:
            return jsonify({
                'pets': []
            }), 200

    except psycopg2.Error as e:
        conn.rollback()  # Rollback any changes made so far
        print(f"Database error in showanimals endpoint: {e}")
        return jsonify({"error": "Database error"}), 500

    except Exception as e:
        print(f"Error in showanimals endpoint: {e}")
        return jsonify({"error": str(e)}), 500

    
@app.route('/getVets', methods=['GET'])
def get_vets():
    try:
        cur.execute("SELECT vetId, clinic_name, name, surname, tel_no, city, street FROM veterinary")
        vets_data = cur.fetchall()
        
        vets_list = []
        for row in vets_data:
            vet_dict = {
                'vetId': row[0],
                'clinicName': row[1],
                'vetName': row[2],
                'vetSurname': row[3],
                'telNo': row[4],
                'city': row[5],
                'street': row[6],
            }
            vets_list.append(vet_dict)

        return jsonify({
            'vets': vets_list,
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)})
    
@app.route('/addvet', methods=['POST'])
def add_veterinarian():
    try:
        # Gelen JSON verisini al
        vet_data = request.get_json()

        # SQL sorgusu oluştur
        insert_query = sql.SQL("""
            INSERT INTO veterinary (clinic_name, name, surname, tel_no, city, street)
            VALUES (%s, %s, %s, %s, %s, %s)
        """)

        # Verileri sorguya parametre olarak ekle
        cur.execute(insert_query, (
            vet_data['clinicName'],
            vet_data['vetName'],
            vet_data['vetSurname'],
            vet_data['telNo'],
            vet_data['city'],
            vet_data['street']
        ))

        # Veritabanı işlemini commit et
        conn.commit()

        # Veritabanı bağlantısını kapat
        

        return jsonify({"message": "Veterinarian added successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400



@app.route('/editvet', methods=['PUT'])
def edit_veterinarian():
    try:
        vet_data = request.get_json()

        update_query = sql.SQL("""
            UPDATE veterinary
            SET clinic_name = %s,
                name = %s,
                surname = %s,
                tel_no = %s,
                city = %s,
                street = %s
            WHERE vetId = %s
        """)

        cur.execute(update_query, (
            vet_data['clinicName'],
            vet_data['vetName'],
            vet_data['vetSurname'],
            vet_data['telNo'],
            vet_data['city'],
            vet_data['street'],
            vet_data['vetId']
        ))

        conn.commit()

        return jsonify({"message": "Veterinarian updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400
    

@app.route('/getOwners', methods=['GET'])
def get_owners():
    try:
        # SQL sorgusu: adoption, owner, users ve animal tablolarını birleştirerek gerekli bilgileri alıyoruz
        query = """
            SELECT u.name, u.surname, u.email, o.tel_no, o.address, a.animalName, a.age, a.genus, a.gender, ad.date
            FROM adoption ad
            JOIN owner o ON ad.ownerid = o.pid
            JOIN "users" u ON o.pid = u.pid
            JOIN animal a ON ad.animalid = a.animalid
        """
        cur.execute(query)
        owners_data = cur.fetchall()

        # Gelen veriyi işleyip JSON formatına çeviriyoruz
        owners_list = []
        for row in owners_data:
            adoption_date = row[9].strftime('%Y-%m-%d') if row[9] else None
            owner_dict = {
                'name': row[0],
                'surname': row[1],
                'email': row[2],
                'telNo': row[3],
                'address': row[4],
                'animalName': row[5],
                'animalAge': row[6],
                'animalGenus': row[7],
                'animalGender': row[8],
                'adoptionDate': adoption_date
            }
            owners_list.append(owner_dict)
 
        return jsonify({
            'owners': owners_list,
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)})



@app.route('/getAvailableAnimals', methods=['GET'])
def get_available_animals():
    try:
        cur.execute("SELECT animalId, animalName FROM animal WHERE status = FALSE")
        animals_data = cur.fetchall()

        animals_list = []
        for row in animals_data:
            animal_dict = {
                'animalId': row[0],
                'animalName': row[1]
            }
            animals_list.append(animal_dict)
        return jsonify({
            'animals': animals_list,
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/getAvailableUsers', methods=['GET'])
def get_available_users():
    try:
        query = """
            SELECT u.pid, u.name, u.surname, u.email
            FROM "users" u
            LEFT JOIN owner o ON u.pid = o.pid
            WHERE o.pid IS NULL
        """
        cur.execute(query)
        users_data = cur.fetchall()

        users_list = []
        for row in users_data:
            user_dict = {
                'pid': row[0],
                'name': row[1],
                'surname': row[2],
                'email': row[3]
            }
            users_list.append(user_dict)
        return jsonify({
            'users': users_list,
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/addOwner', methods=['POST'])
def add_owner():
    try:
        owner_data = request.get_json()

        # Insert into owner table
        insert_owner_query = sql.SQL("""
            INSERT INTO owner (pid, tel_no, address)
            VALUES (%s, %s, %s)
            RETURNING pid
        """)
        cur.execute(insert_owner_query, (
            owner_data['pid'],
            owner_data['telNo'],
            owner_data['address']
        ))
        ownerId = cur.fetchone()[0]

        # Insert into adoption table
        insert_adoption_query = sql.SQL("""
            INSERT INTO adoption (ownerId, animalId, date)
            VALUES (%s, %s, %s)
        """)
        cur.execute(insert_adoption_query, (
            ownerId,
            owner_data['animalId'],
            datetime.now().strftime('%Y-%m-%d')
        ))

        # Update animal status in animal table
        update_animal_query = sql.SQL("""
            UPDATE animal
            SET status = TRUE
            WHERE animalId = %s
        """)
        cur.execute(update_animal_query, (owner_data['animalId'], ))

        conn.commit()

        return jsonify({"message": "Owner added successfully"}), 201

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 400
        
@app.route('/addAnimal', methods=['POST'])
def add_animal():
    try:
        data = request.get_json()

        # Insert into medical_history table
        insert_medical_query = sql.SQL("""
            INSERT INTO medical_history (vetId, medication, height, weight, medical_condition, note)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING medId
        """)
        cur.execute(insert_medical_query, (
            data['vetId'],
            data['medication'],
            data['height'],
            data['weight'],
            data['medicalCondition'],
            data['note']
        ))
        med_id = cur.fetchone()[0]

        # Insert into animal table
        insert_animal_query = sql.SQL("""
            INSERT INTO animal (medId, animalName, status, age, genus, gender)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING animalId
        """)
        cur.execute(insert_animal_query, (
            med_id,
            data['animalName'],
            data['status'],
            data['age'],
            data['genus'],
            data['gender']
        ))
        animal_id = cur.fetchone()[0]

        # Insert into animal_photos table (for now, assume there's a placeholder entry)
        insert_photo_query = sql.SQL("""
            INSERT INTO animal_photos (animalId, photo_data)
            VALUES (%s, %s)
        """)
        cur.execute(insert_photo_query, (
            animal_id,
            data['photo']
        ))

        conn.commit()

        return jsonify({"message": "Animal added successfully"}), 201

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 400
    
@app.route('/deleteAnimal/<int:animalId>', methods=['DELETE'])
def delete_animal(animalId):
    try:
        # Delete from adoption table
        delete_adoption_query = sql.SQL("""
            DELETE FROM adoption
            WHERE animalId = %s
        """)
        cur.execute(delete_adoption_query, (animalId, ))

        # Delete from animal_photos table
        delete_photos_query = sql.SQL("""
            DELETE FROM animal_photos
            WHERE animalId = %s
        """)
        cur.execute(delete_photos_query, (animalId, ))

        # First, get the medId from the animal table
        cur.execute("SELECT medId FROM animal WHERE animalId = %s", (animalId, ))
        medId = cur.fetchone()[0]

        # Delete from animal table
        delete_animal_query = sql.SQL("""
            DELETE FROM animal
            WHERE animalId = %s
        """)
        cur.execute(delete_animal_query, (animalId, ))

        # Delete from medical_history table
        delete_medical_query = sql.SQL("""
            DELETE FROM medical_history
            WHERE medId = %s
        """)
        cur.execute(delete_medical_query, (medId, ))

        conn.commit()

        return jsonify({"message": "Animal deleted successfully"}), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 400
    
@app.route('/getDonations', methods=['GET'])
def get_donations():
    try:
        query = """
            SELECT d.donationid, u.name, u.surname, d.date, d.amount
            FROM donation d
            JOIN users u ON d.pid = u.pid
        """
        cur.execute(query)
        donations_data = cur.fetchall()

        total_amount = sum(row[4] for row in donations_data)

        donations_list = []
        for row in donations_data:
            donation_dict = {
                'donationid': row[0],
                'name': row[1],
                'surname': row[2],
                'date': row[3].strftime('%Y-%m-%d'),
                'amount': row[4]
            }
            donations_list.append(donation_dict)

        return jsonify({
            'donations': donations_list,
            'total_amount': total_amount
        }), 200

    except psycopg2.Error as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/deleteDonation/<int:donationId>', methods=['DELETE'])
def delete_donation(donationId):
    try:
        # Delete from adoption table
        delete_adoption_query = sql.SQL("""
            DELETE FROM donation
            WHERE donationid = %s
        """)
        cur.execute(delete_adoption_query, (donationId, ))

      

        conn.commit()

        return jsonify({"message": "Donation deleted successfully"}), 200

    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 400
    
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    firstname = data.get('firstName')
    lastname = data.get('lastName')
    username = data.get('username')
    password = data.get('password')

    cur.execute("SELECT email, username FROM users WHERE email = %s OR username = %s", (email, username))
    user = cur.fetchone()

    print(f"Data to be inserted: {firstname}, {lastname}, {username}, {password}, {email}")

    if not firstname or not lastname or not username or not password or not email:
        return jsonify({'message': 'Please fill out the form!'}), 400

    elif user:
        return jsonify({'message': 'Account already exists!'}), 400

    else:
        cur.execute("INSERT INTO users (email, username, name, surname, password) VALUES (%s, %s, %s, %s, %s)", (email, username, firstname, lastname, password))
        conn.commit()
        return jsonify({'message': 'You have successfully registered!'}), 200


"""@app.route('/login', methods=['POST'])
def login():
    data = request.get_json() 
    print("data",data)
    username = data.get('username')
    print("username",username)
    password = data.get('password')

    # Check if account exists in our database
    cur.execute("SELECT email, username, name, surname, password FROM users WHERE username = %s", (username,))
    user = cur.fetchone()

    print(f"Data to be checked: {password}, {username}")
    
    if not password or not username:
        return jsonify({'message': 'Please fill out the form!'}), 400
    print("user:",user)
    if user:
        user_password_hash = user[4]
        
        if user_password_hash==password:
            if user[0] == "admin@admin.com":
                return jsonify({'message': 'admin'}), 200
            else:
                global usernameLogin
                usernameLogin= usernameLogin+ username
                print(usernameLogin)
                return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'message': 'Incorrect password'}), 400
    else:
        return jsonify({'message': 'Incorrect username'}), 400"""
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print("data", data)
    username = data.get('username')
    print("username", username)
    password = data.get('password')

    # Check if account exists in our database
    #cur.execute("SELECT email, username, name, surname, password FROM users WHERE username = %s", (username,))
    cur.execute("SELECT email, username, name, surname, password FROM users WHERE username = %s", (username,))
    user = cur.fetchone()


    cur.execute("SELECT email, username, name, surname, password FROM admins WHERE username = %s", (username,))
    admin=cur.fetchone()
    print(f"Data to be checked: {password}, {username}")

    if not password or not username:
        return jsonify({'message': 'Please fill out the form!'}), 400

    print("user:", user)
    global usernameLogin
    usernameLogin=""
    """if user or admin:
        user_password_hash = user[4]
        admin_password_hash=admin[4]

        if user_password_hash == password:
            # Check if the user is an admin
            cur.execute("SELECT username FROM admins  WHERE username = %s", (username,))
            admin_user = cur.fetchone()

            if admin_user:
                return jsonify({'message': 'admin'}), 200
            else:
                return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'message': 'Incorrect password'}), 400
    else:
        return jsonify({'message': 'Incorrect username'}), 400"""
    
    if user:
        user_password_hash = user[4]
        
        if user_password_hash==password:
      
            
            usernameLogin= usernameLogin+ username
            print(usernameLogin)
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'message': 'Incorrect password'}), 400
    elif admin:
        admin_password_hash = admin[4]
        
        if admin_password_hash==password:
 
            
            usernameLogin= usernameLogin+ username
            print(usernameLogin)
            return jsonify({'message': 'admin'}), 200
        else:
            return jsonify({'message': 'Incorrect password'}), 400

    else:
        return jsonify({'message': 'Incorrect username'}), 400
    
    
    

@app.route('/getUser', methods=['POST'])
def getUser():
    global usernameLogin
    username1 = usernameLogin
    print("username1:", username1)
    
    try:
        # Fetch user information
        cur.execute("SELECT email, username, name, surname, password FROM users WHERE username = %s", (username1,))
        user = cur.fetchone()
        
        if user:
            return jsonify({'message': user}), 200
        else:
            return jsonify({'message': 'User not found!'}), 404
        
        print("user", user)
        

    
    except Exception as e:
        print(f"Error retrieving information: {e}")
        return jsonify({'message': 'Error retrieving information!'}), 500
    
@app.route('/updateUser', methods=['POST'])
def updateUser():
    global usernameLogin
    data = request.get_json()
    email = data.get('email')
    name = data.get('name')
    surname = data.get('surname')
    password = data.get('password')
    
    try:
        # Update user information in the database
        cur.execute("UPDATE users SET email = %s, name = %s, surname = %s, password = %s WHERE username = %s", 
                    (email, name, surname, password, usernameLogin))
        conn.commit()
        return jsonify({'message': 'User updated successfully!'}), 200
    except Exception as e:
        print(f"Error updating user information: {e}")
        return jsonify({'message': 'Error updating user information!'}), 500

# Route to handle donation form submission
@app.route('/donation', methods=['POST'])
def donation():
    global usernameLogin  # Assuming you have the username stored globally
    data = request.get_json()
    name = data.get('name')
    surname = data.get('surname')
    email = data.get('email')
    phonenumber = data.get('phonenumber')
    amount = data.get('amount')

    try:
        # Fetch the user ID (pid) based on the provided username
        cur.execute("SELECT pid FROM users WHERE username = %s", (usernameLogin,))
        pid = cur.fetchone()[0]

        # Insert donation details into the database
        cur.execute("INSERT INTO donation (pid, date, amount) VALUES (%s, %s, %s)",
                    (pid, date.today(), amount))
        conn.commit()

        return jsonify({'message': 'Donation successfully recorded!'}), 200
    except Exception as e:
        print(f"Error recording donation: {e}")
        return jsonify({'message': 'Error recording donation!'}), 500

if __name__ == '__main__':
    app.run(debug=True)
