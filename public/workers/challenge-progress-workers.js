self.onmessage = async (event) => {
    const { lessonId, challengeId } = event.data;

    try {
        const response = await fetch("/api/challenge-progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lessonId, challengeId }),
        });

        self.postMessage({ status: response.status, message: "completed" });
    } catch (error) {
        self.postMessage({ status: false, error: error, message: "none" });
    }
};
