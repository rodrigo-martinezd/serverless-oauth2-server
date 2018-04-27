import * as uuid from 'uuid/v4';
import * as moment from 'moment'
import { IAuthorizationCode } from "../../core/IModel";

export class AuthorizationCode implements IAuthorizationCode {
    get id(): string {
        return this._id
    }
    private _id: string

    get subject(): string {
        return this._subject
    }
    private _subject: string

    get created(): Date {
        return this._created
    }
    private _created: Date

    get expires(): Date {
        return this._expires
    }
    private _expires: Date

    static create(params: { subject: string }): AuthorizationCode {
        let code = new AuthorizationCode()
        code._id = uuid()
        code._subject = params.subject
        code._created = new Date()
        code._expires = moment(code._created).add(1, 'h').toDate()
        return code;
    }

    /**
     * Returns if this autorization code is still valid
     */
    isValid(): boolean {
        return this._expires > new Date()
    }
}