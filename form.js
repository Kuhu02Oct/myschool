document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");
    const msg = document.getElementById("formMessage");

    if (!form) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        msg.textContent = "Sending...";
        msg.style.color = "black";

        const data = {
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            subject: form.subject.value,
            message: form.message.value
        };

        try {
            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbzUS6PW8o8HkZeQZBTDmj8vyeqDBd5mUcl7CCtR6dwsM2wKauG2tYoSClDnM1fkp4cEZA/exec",
                {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            const result = await response.json();

            if (result.result === "success") {
                msg.textContent = "✓ Message sent successfully!";
                msg.style.color = "green";
                form.reset();
            } else {
                msg.textContent = "Server error — try again";
                msg.style.color = "red";
            }

        } catch (error) {
            msg.textContent = "Connection failed — check internet";
            msg.style.color = "red";
        }
    });
});
