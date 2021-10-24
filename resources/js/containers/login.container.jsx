/**
 *  file: login.container
 * 
 *  type: (container)
 * 
 *  purpose: render the login section of the website 
 * 
 * 
 */

 import { Footer } from '../componets/home/footer';
 import { LoginPage } from '../componets/login/login';
 import {Header} from '../componets/home/header';

export default function LoginContainer(props) {
    return (
        <div>
            <Header />
             <LoginPage /> 
             <Footer />
        </div>
    );
}