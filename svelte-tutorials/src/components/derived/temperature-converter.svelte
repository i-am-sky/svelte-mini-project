<script>
  let celsius = $state({
    _value: 0,
    get value() {
      return this._value;
    },
    set value(v) {
      this._value = v;
      fahrenheit._value = (v * 9) / 5 + 32;
    },
  });
  let fahrenheit = $state({
    _value: 0,
    get value() {
      return this._value;
    },
    set value(v) {
      this._value = v;
      celsius._value = (v - 32) / (9 / 5);
    },
  });
</script>

C: <input type="number" bind:value={celsius.value} /> <br />
F: <input type="number" bind:value={fahrenheit.value} />
