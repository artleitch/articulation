import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {lang} from 'moment'
import {of} from 'rxjs'
import {Language} from 'src/entities/language.entity'
import {DeleteResult, Repository} from 'typeorm'

export interface createLanguageOptions {
    languageCode: string
}

export interface updateLanguageOptions extends Partial<Language> {
    id: string
}

@Injectable()
export class LanguageService {
    public constructor(@InjectRepository(Language) private languageRepository: Repository<Language>) {}

    public createLanguage = (language: createLanguageOptions): Promise<Language> => {
        const newLanguage = this.languageRepository.create(language)
        return this.languageRepository.save(newLanguage)
    }

    // TODO Batch create language

    public getAllLanguages = (): Promise<Language[]> => {
        return this.languageRepository.find()
    }

    public getLanguageById = (languageId: string): Promise<Language> => {
        try {
            return this.languageRepository.findOneOrFail(languageId)
        } catch (err) {
            throw err
        }
    }

    public getLanguageByCode = (languageCode): Promise<Language[]> => {
        return this.languageRepository.find({
            where: {
                languageCode,
            },
        })
    }

    public updateLanguage = (languageId: string, language: updateLanguageOptions): Promise<Language> => {
        const languageToUpdate = this.getLanguageById(languageId)
        if (!languageToUpdate) throw new Error('No language found')
        return this.languageRepository.save({
            id: languageId,
            ...language,
        })
    }

    public deleteLanguage = (languageId: string): Promise<DeleteResult> => {
        try {
            return this.languageRepository.delete(languageId)
        } catch (err) {
            throw err
        }
    }
}
