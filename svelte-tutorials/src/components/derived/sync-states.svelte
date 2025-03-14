<!-- <script>
    //way one of doing it
  let total = 100;
  let spent = $state(0);
  let left = $state(total);

  const updateSpent = (event) => {
    spent = +event.target.value;
    left = total - spent;
  };

  const updateLeft = (event) => {
    left = event.target.value;
    spent = total - left;
  };
</script> -->

<!-- <label for="">
  <input type="range" value={spent} oninput={updateSpent} max={total} />
  {spent}/{total} Spent
</label>

<label for="">
  <input type="range" value={left} oninput={updateLeft} max={total} />
  {left}/{total} Left
</label> -->

<!-- ////////////////////////////////////////////////////////////////////////////// -->

<script>
    let total = 100;
    let spent = $state(0);

    let left = {
        get value() {
            return total - spent;
        },
        set value(v) {
            spent = total - v;
        }
    };
</script>

<label >
  <input type="range" bind:value={spent} max={total} />
  {spent}/{total} Spent
</label>

<label >
  <input type="range" bind:value={left.value} max={total} />
  {left.value}/{total} Left
</label>