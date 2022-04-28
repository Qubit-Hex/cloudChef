<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
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
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            border-radius: 25px;
        }

    </style>
</head>

<body>

    <table align="center" border="0" cellpadding="0" cellspacing="0" width="75%" bgcolor="white" style="border:2px solid black">

        <tr>
            <td align="center" valign="top" style="padding:20px 0">
                <h1 style="color:black;font-size:20px;font-weight:bold;margin:0;padding:0;text-align:center">
                    <h1 style="color:black;font-size:20px;font-weight:bold;margin:0;padding:0;text-align:center">
                       Cloud Chef Email System
                </h1>
                <!-- display the body of the message -->
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="60%" bgcolor="#fff" style="border: 1px solid blackl">
                    <tr>
                        <td align="center" valign="top" style="padding:20px 0">
                                <h2 style="color:black;font-size:20px;font-weight:bold;margin:0;padding:0;text-align:center">
                                    Please Contact request from {{$name}}
                                </h2>

                                <h3 style="color:black;font-size:20px;font-weight:bold;margin:0;padding:0;text-align:center">
                                    {{ $name }}  {{ $email }} {{ $phone }}
                                </h3>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <p> Please take a look at the following information about the inquiry: </p>
                        </td>
                    </tr>

                    <tr style='border: 1px solid black;'>
                        <td>
                            <ul>
                                <li>
                                    <p>
                                        <strong>Name:</strong> {{ $name }}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Email:</strong> {{ $email }}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Phone:</strong> {{ $phone }}
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Company:</strong> {{ $company }}
                                    </p>
                                </li>
                            </ul>
                        </td>
                    </tr>


                    <tr>
                        <p> <small> This email was sent from the Cloud Chef website. If you have any questions, please contact us at
                            <a href="mailto:oshwaba@cloud-chef.ca" >
                            oshwaba@cloud-chef.ca
                            </a>

                        </p>
                    </tr>
                </table>
            </td>
        </tr>

    </table>



</body>
</html>
