<script>
    let side = $state("");
    let history = $state([]);

    function flip() {
        side = Math.random() < 0.5 ? "HEADS" : "TAILS";
        history.push(side);
    }

</script>

<button onclick={flip}>
    {side || "FLIP"}
</button>
<p>history: [{history}]</p>