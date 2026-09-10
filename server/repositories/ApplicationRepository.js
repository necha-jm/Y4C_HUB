import { BaseRepository } from './BaseRepository.js';

export class ApplicationRepository extends BaseRepository {
    constructor() {
        super('applications');
    }
}
