# PitHub (Node.js + React + Firebase)

## 1. Project Summary

### Overview

A university-focused video sharing platform where authenticated users (students/professors) can:

* Upload, view, and manage videos
* Organize content into class-based containers
* Control visibility (public/private)
* Discover content via search
* Track content via starred profiles/classes



## 2. Core Concept Model

```
User
 ├── Profile
 ├── Classes
 │     ├── Metadata
 │     └── Videos
 │           ├── File (Firebase Storage)
 │           └── Metadata (Firestore)
 └── Stars
```



## 3. Core Features

### Authentication

* Restrict login to university emails
* Firebase Auth integration

### User Profiles

* Display user info and classes
* Public / Private toggle
* Star system

### Classes

Attributes:

* Name
* Professor
* Description
* Visibility
* Owner

Capabilities:

* Create / Edit / Delete
* Contains videos

### Video System

Metadata:

* Title
* Description
* Thumbnail
* Upload date
* Original creation date
* Visibility
* Uploader reference
* Class reference

Storage:

* Video file → Firebase Storage
* Metadata → Firestore

Capabilities:

* Upload
* Delete
* Stream

### Dashboard

* User’s classes
* Create/edit/delete classes
* Sidebar with starred content

### Search

* Search users, classes, videos
* Firestore indexing (basic)

### Privacy & Permissions

| Entity  | Visibility     | Access      |
| - | -- | -- |
| Profile | Public/Private | All / Owner |
| Class   | Public/Private | All / Owner |
| Video   | Public/Private | All / Owner |



## 4. Tech Stack

### Frontend

* React.js
* Tailwind CSS
* React Router

### Backend

* Node.js (Express)
* Firebase Admin SDK

### Database

* Firebase Firestore

### Storage

* Firebase Storage

### Authentication

* Firebase Auth



## 5. Database Design

### Users

```
{
  id,
  name,
  email,
  profileVisibility,
  createdAt
}
```

### Classes

```
{
  id,
  ownerId,
  name,
  professor,
  description,
  visibility,
  createdAt
}
```

### Videos

```
{
  id,
  classId,
  uploaderId,
  title,
  description,
  videoUrl,
  thumbnailUrl,
  visibility,
  originalDate,
  createdAt
}
```

### Stars

```
{
  id,
  userId,
  targetType: "user" | "class",
  targetId
}
```



## 6. System Design Considerations

### Video Upload Strategy

* Upload directly to Firebase Storage
* Store metadata separately in Firestore

### Security Rules

* Only owners can modify content
* Private content is restricted

### Search Limitations

* Firestore supports limited querying
* Consider Algolia later

### Scalability Risks

* Video size
* Bandwidth
* Query performance



## 7. Development Phases

### Phase 1 — Foundation

* Setup React app
* Setup Node backend
* Setup Firebase
* Implement authentication

### Phase 2 — Core Models

* Implement users and classes
* Create class APIs

### Phase 3 — Video System

* Upload videos
* Store metadata

### Phase 4 — Permissions

* Implement visibility rules

### Phase 5 — Profiles & Stars

* Profile pages
* Star functionality

### Phase 6 — Search

* Implement search features

### Phase 7 — UI/UX

* Improve layout and usability

### Phase 8 — Optimization

* Pagination
* Lazy loading

### Phase 9 — Future Features

* Documents/notes
* Study groups
* Comments
* Likes/dislikes



## 8. Key Architectural Decisions

1. Firestore schema design
2. Permission model
3. Direct upload strategy
4. Class-based hierarchy



## 9. Immediate Next Steps

1. Create Firebase project
2. Setup Firestore, Auth, Storage
3. Initialize React + Node apps
4. Implement login system
