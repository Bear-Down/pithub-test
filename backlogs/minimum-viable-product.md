# PitHub Minimum Viable Product (MVP) Proposal

**Project:** PitHub  
**Document:** Minimum Viable Product Proposal  
**Audience:** University Staff and Faculty  
**Technology:** React.js, Node.js, Firebase  

**Proposal By:** Bear Down Scrum Team

| **Member** | **Lewis University Email Address** |
| ---------- | ----------- |
| Kevin Dacanay | kevinbrianfdacanay@lewisu.edu | 
| Sebastian Jaculbe | sebastiandjaculbe@lewisu.edu | 
| Erick Hernandez | erickdhernandez@lewisu.edu | 
| Edward Rodriguez | edwardhrodriguez@lewisu.edu | 
| Kaleb Hernandez | kalebjrichardson@lewisu.edu | 

## 1. MVP Definition

A Minimum Viable Product (MVP) is the smallest version of a product that provides meaningful value to its intended users while allowing the development team to collect validated feedback and learning with minimal effort. Agile Alliance defines an MVP as the “version of a new product which allows a team to collect the maximum amount of validated learning about customers with the least effort.” This means an MVP should not attempt to contain every planned feature; it should contain enough functionality to solve the core problem and validate whether the proposed solution is useful.

For PitHub, the MVP should therefore focus on the essential workflow of **authorized university faculty and staff uploading, organizing, managing, and sharing instructional videos and documents**. Features such as study groups, advanced recommendation algorithms, extensive social functionality, and student personal storage should remain outside the initial release.

## 2. Product Problem

University faculty and staff may need to distribute recorded lectures, instructional videos, presentations, PDFs, notes, and other educational resources to colleagues or members of the university community. These resources can become fragmented across personal cloud storage, email attachments, learning platforms, shared drives, and other systems.

PitHub proposes a centralized university-oriented media hub where authorized faculty and staff can store and organize instructional resources and make them available to appropriate users.

The initial product will **not** be positioned as general-purpose cloud storage. Restricting primary content creation and storage to university staff and faculty reduces unnecessary storage consumption and keeps the platform focused on institutional and educational resources.

## 3. Proposed MVP

The PitHub MVP will provide five core capabilities:

### 3.1 University Authentication

Users will authenticate using an approved university account, initially through Firebase Authentication and Google-based authentication.

The MVP should:

- Allow authorized university staff and faculty to sign in.
- Prevent unauthorized accounts from accessing protected application functionality.
- Maintain authenticated sessions.
- Allow users to securely sign out.
- Associate uploaded resources with their authenticated owner.

Authentication is foundational because PitHub is intended to host university resources rather than operate as a public file-sharing service.

### 3.2 Class/Collection Organization

Users will be able to create organizational collections representing classes, courses, departments, projects, or other academic groupings.

Each class/collection should support basic metadata such as:

- Class or collection name
- Professor/instructor name
- Description or additional information
- Owner
- Visibility

Users should be able to create, view, edit, and delete their own classes. Resources uploaded to PitHub will belong to a specific class or collection.

This provides the core organizational model:

**User → Class/Collection → Videos/Documents**

### 3.3 Video Upload, Management, and Viewing

Video hosting is the primary MVP capability.

Authorized users should be able to:

- Upload a video to a selected class.
- Specify a title and description.
- Add the original creation/recording date.
- Upload a custom thumbnail when available.
- Set visibility.
- View videos through the web application.
- Edit video metadata.
- Delete videos they own.
- Download videos when downloading is permitted.

Firebase Storage will provide the underlying file storage while Firestore will store metadata needed to organize and retrieve the resources.

Large-file uploads should provide basic progress feedback so users know whether an upload is proceeding successfully.

### 3.4 Document Upload and Viewing

Because PitHub is intended to become a broader instructional-resource hub, documents should be included in the MVP, but with a deliberately narrow scope.

The MVP should support common document formats, particularly PDFs. Users should be able to:

- Upload a document to a class.
- Give the document a meaningful title.
- View supported documents in the browser when possible.
- Download documents when permitted.
- Edit document metadata.
- Delete documents they own.

The MVP does not need to support every document format, collaborative editing, or advanced note-taking functionality. Those capabilities can be added after validating the core platform.

### 3.5 Search and Basic Discovery

Users need a practical way to locate instructional resources once the platform contains multiple classes and files.

The MVP should provide search across:

- Classes/collections
- Users/profiles
- Videos
- Documents

Basic filtering should allow users to narrow results by relevant metadata such as class or date.

The search system does not initially need sophisticated machine-learning recommendations. A reliable metadata-based search experience is sufficient for validating whether centralized PitHub storage improves resource discovery.

## 4. Visibility and Sharing

PitHub's MVP should provide basic visibility controls.

A user should be able to determine whether a class or resource is publicly discoverable within the authenticated PitHub environment or restricted according to the application's access rules.

The exact permission model should remain deliberately simple during the MVP. More advanced permissions—such as department-level access, professor/student roles, invitation-only classes, or granular sharing permissions—can be implemented after the initial authentication and authorization model has been validated.

## 5. Administration and Security

Security is a required part of the MVP rather than a later enhancement because PitHub will store university-owned instructional content.

The MVP should include:

- Firebase Authentication integration.
- Protected application routes.
- Firebase Firestore security rules.
- Firebase Storage security rules.
- Ownership checks for modifying and deleting resources.
- File type validation.
- Reasonable file-size limits.
- Basic API input validation.
- Centralized error handling.
- Basic logging for important backend operations.

A lightweight administrative interface should also be included if time permits, with priority given to basic content moderation and reported-content review rather than a full enterprise administration suite.

## 6. Explicitly Out of Scope for the MVP

To prevent the MVP from becoming a “fat MVP,” the following features should be deferred:

- Student personal file storage.
- Study-group matching.
- Social networking functionality.
- Advanced profile starring/following systems.
- Video comments and discussion systems.
- Collaborative document editing.
- Rich in-browser note-taking.
- AI-powered recommendations.
- Advanced video transcoding and quality processing.
- Native mobile applications.
- Complex role-based permissions.
- Advanced analytics.
- Sophisticated notification systems.
- Full administrative reporting and analytics.

These are valid future features, but they do not need to be present to determine whether PitHub successfully solves its primary problem.

## 7. MVP Success Criteria

The MVP should be considered successful when an authorized faculty or staff member can complete the complete core workflow without developer intervention:

1. Sign in using their university account.
2. Create a class or collection.
3. Upload a video or document.
4. Associate the resource with the appropriate class.
5. Configure its visibility.
6. View the resource from the class page.
7. Search for the resource later.
8. Download the resource when permitted.
9. Edit or delete resources they own.

From a product perspective, the MVP should also allow the team to collect feedback from an initial group of faculty and staff regarding:

- Ease of uploading resources.
- Ease of organizing resources.
- Ease of finding resources.
- Reliability of video playback and document access.
- Storage and upload limitations.
- Whether PitHub is preferable to users' existing methods of sharing instructional media.

## 8. Proposed MVP Development Strategy

Development should proceed incrementally rather than attempting to implement the entire backlog simultaneously.

**Phase 1 — Foundation:** React frontend, Node.js/Express backend, Firebase configuration, development/production environments, repository structure, authentication, and security rules.

**Phase 2 — Core Organization:** User profiles, class/collection creation and management, class pages, and ownership rules.

**Phase 3 — Media:** Video and document uploads, Firebase Storage integration, metadata management, viewing, downloading, and deletion.

**Phase 4 — Discovery:** Search, basic filtering, dashboard resource listings, and usability improvements.

**Phase 5 — Validation:** Security testing, file validation, error handling, performance testing, faculty/staff user testing, and deployment.

Each phase should produce a usable increment. Feedback from initial users should determine which features are promoted from the future backlog into subsequent releases.

## 9. Conclusion

The proposed PitHub MVP intentionally focuses on one central value proposition: **providing university faculty and staff with a secure, organized hub for hosting and sharing instructional videos and documents**.

Rather than attempting to build a complete educational social platform immediately, the MVP establishes the foundation required for PitHub to prove its usefulness. Authentication, class organization, video and document management, search, access control, and basic security form the smallest coherent product that can deliver meaningful value.

Once faculty and staff begin using the system, their feedback can guide subsequent development. This approach aligns PitHub with the Agile Alliance concept of an MVP: deliver only the functionality necessary to provide value and generate validated learning, then use that learning to determine what should be built next.
