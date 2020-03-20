<script>
  // Basically a recreation of https://www.npmjs.com/package/svelte-emoji by Sean McPherson.
  export let symbol;
  export let label = null;
  const hidden = !label ? true : null;
</script>

<style>

</style>

<span class="emoji" role="img" aria-hidden={hidden} aria-label={label}>
  {symbol}
</span>
