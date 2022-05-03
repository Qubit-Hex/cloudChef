
<?php

/**
 *
 *  @file: registration.blade.php
 *
 *
 *  @purpose: email template for user registration
 *
 *
 */

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <style>
        @media only screen and (max-width: 600px) {
            .inner-body {
                width: 100% !important;
            }

            .footer {
                width: 100% !important;
            }
        }

        @media only screen and (max-width: 500px) {
            .button {
                width: 100% !important;
            }
        }


        body {
            background-color: #ccc;
            color: black;
            font-family: Arial, Helvetica, sans-serif;
        }

        .shadows {
            box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
            border-radius: 25px;
            align-self: center;
        }

        .shadows ul {
            list-style-type: none;
            text-align: center;
            margin: auto;

        }


        button {
            background-color: #2b17aac1;
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            border-radius: 25px;
            font-weight: 700;
        }

        button:hover {
            background-color: #0f054ec1;
            cursor: pointer;
        }


        #listed-items li {
            width: 50%;
            margin-top: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            padding: 20px;
            margin-top: 10px;
            margin-bottom: 10px;
            margin-left: auto;
            margin-right: auto;
        }

    </style>
</head>

<body>


    <h1 style='color: rgb(11, 41, 70);  text-align: center;'> Cloud Chef </h1>
    <h2 style='color: rgb(11, 41, 70);  text-align: center;'> Let the cloud do the heavy lifting </h2>
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="75%" bgcolor="white" style='border: 1px solid #ccc; border-radius: 10px;'>
        <thead>
            <!-- header !-->
            <tr>
                <td style='padding: 10px; background-color:rgba(20, 46, 89, 0.913); border-top-right-radius: 10px; border-top-left-radius: 10px;'>

                    <div style="display: block; margin: auto; text-align: center;">
                        <img src="http://cloud-chef.ca/img/logo/Cloud%20Chef-logos_white.png" alt="logo" width="200px" height="200px" align="center">
                    </div>

                </td>
            </tr>
        </thead>

        <tbody style='color:rgb(0, 0, 0)'>

            <tr>
                <td style='padding: 20px;'>

                    <h1 style='text-align: center; font-size: 22px; color: rgb(11, 41, 70);'> Password was changed sucessfully. </h1>
                    <hr />
                    <section style='text-align: center;'>
                        <p> Hello User,</p>
                        <p>
                            Your password has been reset. Please use the following credentials to login, and change your password.
                            via the settings page.
                        </p>

                    </section>

                </td>
            </tr>

            <tr>


                <td>

                    <h3 style='color: rgb(11, 41, 70); text-align: center; font-weight: 700; margin-top: 0px; padding-top: 0px;'> Account Details:  </h3>

                    <ul style='list-style-type: none; padding: 20px; text-align: center; font-size: 16px;' id='listed-items'>
                        <li> Email:{{ $email }} </li>
                        <li> Password: {{ $password }} </li>
                        <li> Store ID: {{ $store_id }} </li>
                        <li> Request ID: {{ $request_id }} </li>
                    </ul>

                </td>
            </tr>

            <tr>
                <!-- footer !-->
                <td>
                    <div style='padding: 20px; text-align: center;'>
                        <p style='text-align: center;'>
                            <a href='https://www.cloud-chef.ca/' style='color: rgb(16, 30, 100);'> Cloud Chef </a>
                        </p>

                        <p style='font-size: 12px; text-align: center; color: slategray;'>

                            Cloud Chef, Inc.
                            <br>
                            All Rights Reserved
                        </p>

                    </div>
                </td>

            </tr>

        </tbody>
    </table>

</body>
</html>
