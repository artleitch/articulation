import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Language} from 'src/entities/language.entity'
import {Word, WordTypeEnum} from 'src/entities/word.entity'
import {DeleteResult, In, Repository} from 'typeorm'
import {LanguageService} from '../language/language.service'
import {UsersService} from '../users/users.service'

export interface CreateWordOptions {
    userId: string
    originWord: string
    destinationWord: string
    languageId: string
    type: WordTypeEnum
}

export interface UpdateWordOptions extends Partial<CreateWordOptions> {
    id: string
}

export interface GetWordsOptions {
    languageIds?: string[]
    userIds?: string[]
    types?: WordTypeEnum[]
}

@Injectable()
export class WordService {
    public constructor(
        @InjectRepository(Word) private wordRepository: Repository<Word>,
        private usersService: UsersService,
        private languageService: LanguageService
    ) {}

    public async createWord(wordOptions: CreateWordOptions): Promise<Word> {
        const word = new Word()
        word.originWord = wordOptions.originWord
        word.destinationWord = wordOptions.destinationWord
        word.type = wordOptions.type
        word.user = await this.usersService.findForId(wordOptions.userId)
        word.language = await this.languageService.getLanguageById(wordOptions.languageId)
        // TODO Check that user is currently practicing this language
        // TODO Validate word options
        const newLanguage = this.wordRepository.create(word)
        return this.wordRepository.save(newLanguage)
    }
    public getWordById = (wordId: string): Promise<Word> => {
        try {
            return this.wordRepository.findOneOrFail(wordId)
        } catch (err) {
            throw err
        }
    }
    public getWords = (options: GetWordsOptions): Promise<Word[]> => {
        console.log('OPTIONS', options)
        const whereOptions: any = {}
        if (options.types && options.types.length) whereOptions.type = In(options.types)
        if (options.languageIds && options.languageIds.length) {
            whereOptions.language = {
                id: In(options.languageIds),
            }
        }
        if (options.userIds && options.userIds.length) {
            whereOptions.user = {
                id: In(options.userIds),
            }
        }
        console.log('WORD OPTIONS', whereOptions)
        return this.wordRepository.find({
            where: whereOptions,
        })
    }
    public updateWord = (wordId: string, word: UpdateWordOptions): Promise<Word> => {
        const wordToUpdate = this.getWordById(wordId)
        if (!wordToUpdate) throw new Error('No language found')
        return this.wordRepository.save({
            id: wordId,
            ...word,
        })
    }
    public deleteWord = (wordId: string): Promise<DeleteResult> => {
        try {
            return this.wordRepository.delete(wordId)
        } catch (err) {
            throw err
        }
    }
}
