import { useState } from "react";

function App() {
    const [student, setStudent] = useState(null);
    const [email, setEmail] = useState("");
    const [screen, setScreen] = useState("email");
    const [message, setMessage] = useState("");

    // Registration form data
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [course, setCourse] = useState("");
    const [year, setYear] = useState("");
    const [semester, setSemester] = useState("");
    const [university, setUniversity] = useState("");

    // Login password
    const [loginPassword, setLoginPassword] = useState("");

    // CHECK EMAIL
    const handleContinue = async () => {
        if (!email) {
            setMessage("Please enter your email");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:5000/api/students/check-email",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email
                    })
                }
            );

            const data = await response.json();

            if (data.registered) {
                setScreen("login");
            } else {
                setScreen("register");
            }

        } catch (error) {
            console.error("Error:", error);
            setMessage("Something went wrong");
        }
    };


    // REGISTER STUDENT
    const handleRegister = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/students/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password,
                        name,
                        age: Number(age),
                        course,
                        year: Number(year),
                        semester: Number(semester),
                        university
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                setMessage("Registration successful!");
                setScreen("login");
            } else {
                setMessage(data.message);
            }

        } catch (error) {
            console.error("Registration error:", error);
            setMessage("Something went wrong");
        }
    };


    // LOGIN STUDENT
    const handleLogin = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/students/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password: loginPassword
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                setStudent(data.student);
                setScreen("student");
            } else {
                setMessage(data.message);
            }

        } catch (error) {
            console.error("Login error:", error);
            setMessage("Something went wrong");
        }
    };


    // EMAIL SCREEN
    if (screen === "email") {
        return (
            <div>
                <h1>Student Portal</h1>

                <h2>Enter your email</h2>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button onClick={handleContinue}>
                    Continue
                </button>

                <p>{message}</p>
            </div>
        );
    }


    // REGISTER SCREEN
    if (screen === "register") {
        return (
            <div>
                <h1>Student Portal</h1>

                <h2>Create Your Account</h2>

                <p>{email}</p>

                <input
                    type="password"
                    placeholder="Create password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <br /><br />

                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                />

                <br /><br />

                <input
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />

                <br /><br />

                <input
                    type="number"
                    placeholder="Semester"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="University"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                />

                <br /><br />

                <button onClick={handleRegister}>
                    Register
                </button>

                <p>{message}</p>
            </div>
        );
    }


    // LOGIN SCREEN
    if (screen === "login") {
        return (
            <div>
                <h1>Student Portal</h1>

                <h2>Welcome Back</h2>

                <p>{email}</p>

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                />

                <br /><br />

                <button onClick={handleLogin}>
                    Login
                </button>

                <p>{message}</p>
            </div>
        );
    }


    // STUDENT SCREEN
    if (screen === "student") {
        return (
            <div>
                <h1>Student Portal</h1>

                <h2>Welcome, {student.name}!</h2>

                <h3>Student Details</h3>

                <p>
                    <strong>Name:</strong> {student.name}
                </p>

                <p>
                    <strong>Email:</strong> {student.email}
                </p>

                <p>
                    <strong>Age:</strong> {student.age}
                </p>

                <p>
                    <strong>Course:</strong> {student.course}
                </p>

                <p>
                    <strong>Year:</strong> {student.year}
                </p>

                <p>
                    <strong>Semester:</strong> {student.semester}
                </p>

                <p>
                    <strong>University:</strong> {student.university}
                </p>
            </div>
        );
    }
}

export default App;