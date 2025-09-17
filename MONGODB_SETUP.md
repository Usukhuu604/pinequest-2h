# MongoDB Setup Instructions

## 1. Start MongoDB

```bash
# Make sure MongoDB is running
brew services start mongodb/brew/mongodb-community
# OR
mongod
```

## 2. Create Sample Data

Run this script to create sample student and therapist data:

```bash
cd server
npm run setup-data
```

OR manually run:

```bash
cd server
npx ts-node src/createSampleData.ts
```

## 3. Manual MongoDB Commands (if needed)

Connect to MongoDB:

```bash
mongosh pinequest
```

Create student manually:

```javascript
db.users.insertOne({
  email: "student@test.com",
  name: "Оюутан Тест",
  role: "student",
  studentId: "STU001",
  createdAt: new Date(),
  updatedAt: new Date(),
});
```

Create therapist manually:

```javascript
db.users.insertOne({
  email: "therapist@test.com",
  name: "Д. Мөнхбат",
  role: "therapist",
  specialization: "Сэтгэлзүйн зөвлөгөө",
  availableHours: [
    { day: "monday", startTime: "09:00", endTime: "17:00" },
    { day: "tuesday", startTime: "09:00", endTime: "17:00" },
    { day: "wednesday", startTime: "09:00", endTime: "17:00" },
    { day: "thursday", startTime: "09:00", endTime: "17:00" },
    { day: "friday", startTime: "09:00", endTime: "17:00" },
  ],
  isAvailable: true,
  createdAt: new Date(),
  updatedAt: new Date(),
});
```

## 4. Check Data

```javascript
// List all users
db.users.find().pretty();

// Find students
db.users.find({ role: "student" }).pretty();

// Find therapists
db.users.find({ role: "therapist" }).pretty();
```

## 5. Database Schema

**Users Collection:**

- `_id`: ObjectId
- `email`: String (unique)
- `name`: String
- `role`: "student" | "therapist"
- `studentId`: String (for students)
- `specialization`: String (for therapists)
- `availableHours`: Array (for therapists)
- `isAvailable`: Boolean
- `createdAt`, `updatedAt`: Date

**Sessions Collection:**

- `_id`: ObjectId
- `studentId`: ObjectId (ref: User)
- `therapistId`: ObjectId (ref: User)
- `requestedDate`: Date
- `requestedTime`: String
- `approvedDate`: Date
- `approvedTime`: String
- `status`: "pending" | "approved" | "rejected" | "completed"
- `notes`: String
- `therapistNotes`: String
- `createdAt`, `updatedAt`: Date

**Messages Collection:**

- `_id`: ObjectId
- `sessionId`: ObjectId (ref: Session)
- `senderId`: ObjectId (ref: User)
- `senderRole`: "student" | "therapist"
- `content`: String
- `timestamp`: Date
- `createdAt`, `updatedAt`: Date
