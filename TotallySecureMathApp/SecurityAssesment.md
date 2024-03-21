# Security Assesment for : Totally Secure Math App

##### Cybersecurity Analyst: Ana Joselyn Alarcon

##### Date: March 20th, 2024

### Vulnerabilities Identified in "Notes" :

🔒 **Type of Vulnerability: Insecure Data Storage**  
**Description:** User notes are stored in the AsyncStorage without encryption or additional security measures, such as data obfuscation or access controls.  
**Potential Issues:** This vulnerability exposes user data to potential unauthorized access if the device is compromised. Attackers could extract sensitive information stored in the AsyncStorage, including user credentials or sensitive notes.

🔑 **Type of Vulnerability: Improper Authentication**  
**Description:** User authentication is not properly implemented in the component. It relies on the user object passed through navigation params without any validation or verification.  
**Potential Issues:** Lack of proper authentication allows potential attackers to access the Notes component without valid credentials. Attackers could exploit this vulnerability to gain unauthorized access to sensitive user data or perform unauthorized actions within the application.

🛡️ **Type of Vulnerability: Insufficient Input Validation**  
**Description:** User input for note titles and equations is not sufficiently validated. The component allows empty titles or equations to be added as notes.  
**Potential Issues:** Insufficient input validation increases the risk of storing malformed or unexpected data, leading to potential application errors or data corruption. Attackers could leverage this vulnerability to inject malicious code or trigger unexpected behavior within the application.

🚨 **Type of Vulnerability: Insecure Code Practices**  
**Description:** The component lacks proper error handling and exception management, such as try-catch blocks or error logging.  
**Potential Issues:** Insecure code practices make it difficult to identify and mitigate potential runtime errors or security vulnerabilities. Attackers could exploit unhandled exceptions or errors to disrupt the application's functionality or gather sensitive information through error messages.

💉 **Type of Vulnerability: Code Injection**  
**Description:** The component does not sanitize user input, making it vulnerable to code injection attacks.  
**Potential Issues:** Without input sanitization, attackers could inject malicious code, such as JavaScript payloads, into note titles or equations. This could lead to cross-site scripting (XSS) vulnerabilities or arbitrary code execution within the application, compromising user security and privacy.

### Vulnerabilities Identified in "Note" component

💉 **Type of Vulnerability: Code Injection**  
**Description:** The Note component utilizes the eval() function to evaluate mathematical expressions provided by users. This introduces the risk of code injection attacks, where attackers can execute arbitrary JavaScript code within the application's context.  
**Potential Impact:** Malicious users could exploit this vulnerability to inject and execute arbitrary code, leading to unauthorized actions, data manipulation, or unauthorized access to sensitive information.

## Security Measures Importance and Reflection

#### 🔒 Why Security Measures Are Important

Security measures are an essential part of the development of an application to safeguard their integrity. Encryption and secure storage play a key role in protecting data by encoding it and storing it in a safe manner, which will enable the prevention of unauthorized access or data breaches.
Authentication is also relevant due to the mechanisms that ensure only authorized users can access sensitive information, reducing risk of impersonation. To prevent SQL injection or cross-site scripting (XSS) we can use input validation and/or code sanitization techniques, and with additional error handling practices we can identify and address vulnerabilities.
In conclusion, implementing comprehensive security measures is vital for maintaining user trust, protecting sensitive data, and mitigating potential risks associated with cyber threats.

#### Lessons Learned and Best Practices

1. Security Awareness: I've realized the importance of staying updated on common threats and best practices through training and awareness programs.

2. Secure Coding Practices: I've learned the significance of following secure coding principles to reduce vulnerability risk and prioritize security from the beginning of any project.

🚀 Moving Forward: Best Practices

- Regular Security Check-ups: Conduct frequent security assessments and testing to identify and fix any vulnerabilities.

- Security in all Development Lifecycle: Integrate security into every stage of the development process, since the planning stage to deployment and specially in maintenance.

- Collaboration and Knowledge Sharing: Research, study and collaborate with other developers to improve security awareness and expertise.
