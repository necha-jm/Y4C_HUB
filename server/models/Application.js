export class Application {
    constructor(id, userId, programId, fullName, email, phone, organization, motivation, status = 'pending', submittedAt = new Date().toISOString()) {
        this.id = id;
        this.userId = userId;
        this.programId = programId;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.organization = organization;
        this.motivation = motivation;
        this.status = status;
        this.submittedAt = submittedAt;
    }
}
