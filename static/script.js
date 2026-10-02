const form = document.getElementById("predictionForm");
const emptyState = document.getElementById("emptyState");
const loading = document.getElementById("loading");
const resultState = document.getElementById("resultState");
const prediction = document.getElementById("prediction");
const errorBox = document.getElementById("error");
const predictBtn = document.getElementById("predictBtn");
const resetBtn = document.getElementById("resetBtn");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    emptyState.classList.add("hidden");
    resultState.classList.add("hidden");
    errorBox.classList.add("hidden");
    loading.classList.remove("hidden");
    predictBtn.disabled = true;

    const data = Object.fromEntries(new FormData(form).entries());

    try {
        const response = await fetch("/predict", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });

        const body = await response.json();

        if (!response.ok || !body.success) {
            throw new Error(body.error || "Unable to calculate prediction.");
        }

        prediction.textContent = Number(body.prediction).toFixed(2);
        resultState.classList.remove("hidden");
    } catch (err) {
        errorBox.textContent = err.message;
        errorBox.classList.remove("hidden");
    } finally {
        loading.classList.add("hidden");
        predictBtn.disabled = false;
    }
});

resetBtn.addEventListener("click", () => {
    resultState.classList.add("hidden");
    emptyState.classList.remove("hidden");
    form.reset();
});
