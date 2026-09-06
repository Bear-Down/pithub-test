Scrum Process

Sprint Structure

The team works in two-week sprints.

Each sprint:

* Begins on Monday.
* Ends on Sunday.
* Has a Sprint Planning meeting on the first Tuesday of the sprint.
* Uses asynchronous Discord communication for day-to-day progress updates.
* Concludes with a Sprint Review and Sprint Retrospective held during the final weekend of the sprint.

Scrum Events

Sprint Planning

Schedule: First Tuesday of each sprint at 2:00 PM.

Sprint Planning is used to establish the Sprint Goal and determine the work that the team will complete during the upcoming sprint.

During Sprint Planning, the team will:

1. Review the Product Backlog.
2. Review and discuss the highest-priority backlog items.
3. Clarify requirements and acceptance criteria.
4. Select work for the Sprint Backlog.
5. Determine how the selected work will be accomplished.
6. Establish the Sprint Goal.
7. Identify potential dependencies, risks, and impediments.

The Product Owner is responsible for communicating product priorities and helping clarify backlog items. The Developers determine how the selected work will be implemented, with the Scrum Master helping facilitate the process.

Daily Coordination

The team will not hold a traditional Daily Scrum meeting. Instead, team members will provide asynchronous updates through Discord about their current work.

Members should use Discord to communicate:

* What they are currently working on.
* What they have completed.
* What they plan to work on next.
* Any blockers or impediments.
* Any information that other team members need to know.

Team members are expected to communicate significant blockers or changes in progress promptly rather than waiting until the next formal meeting.

Sprint Review

Schedule: Friday, Saturday, or Sunday during the final weekend of the sprint at a time agreed upon by the team. The specific time may change from sprint to sprint.

During the Sprint Review, the team will:

1. Review the Sprint Goal.
2. Demonstrate completed work.
3. Discuss the Product Increment.
4. Review unfinished work.
5. Gather feedback from relevant stakeholders when applicable.
6. Discuss potential changes to the Product Backlog based on the results of the sprint.

Sprint Retrospective

Schedule: Friday, Saturday, or Sunday during the final weekend of the sprint at a time agreed upon by the team. The specific time may change from sprint to sprint.

The Sprint Retrospective will focus on improving the team’s process and effectiveness.

The team will discuss:

* What went well during the sprint?
* What did not go well?
* What problems or impediments occurred?
* What should the team change for the next sprint?
* What specific actions can be taken to improve the team’s work?

The team should identify actionable improvements and carry relevant changes into the following sprint.

Backlog Management

The Product Owner is responsible for maintaining and prioritizing the Product Backlog.

Backlog items should be sufficiently clear for the Developers to understand the desired outcome and determine the work required to complete them.

The team may discuss and refine backlog items before or during Sprint Planning.

GitHub Workflow

GitHub will be used for source control, issue tracking, project documentation, and collaboration.

The team’s general workflow is:

1. Select a story or task from the Sprint Backlog.
2. Create or use the appropriate GitHub issue.
3. Complete the required development work.
4. Test the implementation as appropriate.
5. Commit the completed work to GitHub.
6. Ensure that the required Definition of Done commit is made to the product branch.
7. Keep relevant GitHub issues and documentation up to date.

The required completion commit must use the following format:

Story [[STORY-NUMBER]] done.

For example:

Story 12 done.

Discord Workflow

Discord is used for asynchronous team coordination throughout the sprint.

Team members should post relevant updates regarding:

* Current development work.
* Completed work.
* Blockers.
* Questions.
* Technical issues.
* Changes that may affect other team members.
* Meeting coordination.

Important decisions or information that should remain permanently accessible should also be documented in GitHub when appropriate.

Impediments

Team members should communicate impediments through Discord as soon as they become aware of them.

The team will work together to resolve impediments. The Scrum Master will help facilitate resolution and remove organizational or process-related obstacles when possible.

Definition of Ready

A story should generally be considered ready for development when:

* The desired outcome is understood.
* The requirements are sufficiently clear.
* Acceptance criteria are available when applicable.
* The team has enough information to begin the work.
* Major dependencies or blockers are understood.

Definition of Done

A story is considered Done when:

* The story’s requirements have been completed.
* Acceptance criteria have been satisfied.
* The implementation has been tested as appropriate.
* Required documentation has been updated.
* The work has been integrated into the product.
* At least one GitHub commit to the product branch has a commit message Story [[STORY-NUMBER]] done.

Process Changes

The team’s Scrum process may be modified when the team determines that a change would improve its effectiveness.

Process changes should be discussed by the team and documented in PROCESS.md when appropriate. Improvements identified during Sprint Retrospectives should be considered for implementation in the following sprint.
