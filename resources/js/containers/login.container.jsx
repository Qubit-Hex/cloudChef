/**
 *  file: login.container
 * 
 *  type: (container)
 * 
 *  purpose: render the login section of the website 
 * 
 * 
 */

 import { Footer } from '../components/home/footer';
 import { LoginPage } from '../components/login/login';
 import {Header} from '../components/home/header';

export default function LoginContainer(props) {
    return (
        <div>
            <Header />
             <LoginPage /> 
             <Footer />
        </div>
    );
}