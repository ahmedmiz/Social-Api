import dotenv from 'dotenv';
dotenv.config(); 
const apikey: string = process.env.MAILJET_API_KEY ? process.env.MAILJET_API_KEY : "";
const secretKey: string = process.env.MAILJET_SECRET_KEY ? process.env.MAILJET_SECRET_KEY : "";
import Mailjet from "node-mailjet"; 
const mailjet = Mailjet.apiConnect(apikey, secretKey); 
export default  async (toEmail:string  , userName : string , token : string ) => {
mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: 'mizoahmed017@gmail.com',
                    Name: 'Api Team'
                },
                To: [
                    {
                        Email: toEmail,
                        Name: userName 
                    }
                ],
                Subject: 'Welcome to The App!',
                TextPart: 'This otp is valid for 30 minutes',
                HTMLPart: `<p>${token}</p>`
            }
        ]
    }).then((result : any)=>{return result}).catch((err : Error)=>{return err});
}
