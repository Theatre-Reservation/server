import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { UserAuth, UserAuthDocument } from "./user-auth.model";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Model } from "mongoose";




@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(UserAuth.name) 
        private readonly UserAuthModel: Model<UserAuthDocument>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET

    })
}

    async validate(payload) {
        const { id} = payload;

        const user = await this.UserAuthModel.findById(id);

        if(!user) {
            throw new UnauthorizedException('Login first to access this endpoint. ')
        }

        return user
}

}