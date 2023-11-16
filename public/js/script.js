window.addEventListener("load", async () => {
  await getCsrftoken();
});

const getCsrftoken = async () => {
  try {
    const res = await fetch("http://localhost:3000/csrf", {
      method: "GET",
    });

    const data = await res.json();

    await loginFunc(data.token);
  } catch (error) {
    console.log(error);
  }
};

const loginFunc = async (token) => {
  try {
    const res = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
        "X-CSRF-Token": token,
      },
      body: JSON.stringify({ name: "Srijit Das" }),
    });

    const data = await res.json();

    const socket = io.connect("http://localhost:3000/", {
      query: {
        token: data.token,
      },
    });

    socket.on("new_connection", (message) => {
      document.getElementById("status").textContent = message;
      document.getElementById("status").style.color = "green";
    });

    socket.on("connect_error", (err) => {
      document.getElementById("status").textContent = err.message;
      document.getElementById("status").style.color = "red";
    });
  } catch (error) {
    console.log(error);
  }
};
