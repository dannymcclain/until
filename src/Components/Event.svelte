<script>
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  dayjs.extend(relativeTime);

  export let symbol, title, date;

  let timeFromNow = dayjs(date).fromNow();
</script>

<style>

</style>

<section>
  <h4>{symbol}</h4>
  <h2>{title}</h2>
  <p>{dayjs(date).format('MMM D, YYYY')}</p>
  <h3>{timeFromNow}</h3>
</section>
