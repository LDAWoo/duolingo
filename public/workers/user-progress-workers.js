self.onmessage = async (event) => {
    const { challengeId } = event.data;

    try {
        const response = await fetch("/api/user-progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ challengeId }),
        });

        const data = await response.json();

        self.postMessage({ status: response.status, message: data.message, data: data.data });
    } catch (error) {
        self.postMessage({ status: false, error: error, message: "none" });
    }
};
