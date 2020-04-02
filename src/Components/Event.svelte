<script>
  import dayjs from "dayjs";
  import relativeTime from "dayjs/plugin/relativeTime";
  dayjs.extend(relativeTime);

  export let symbol, title, date;

  $: timeFromNow = dayjs(date).fromNow();
</script>

<style>
  section {
    background: #272729;
    border-radius: 4px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    place-items: center;
  }
  h4 {
    font-weight: 800;
    font-size: 40px;
    line-height: 1;
    margin-bottom: 16px;
  }
  h2 {
    font-weight: 800;
    font-size: 20px;
    line-height: 1;
    text-align: center;
    letter-spacing: -0.01em;
    color: #ffffff;
    margin-bottom: 8px;
  }
  p {
    font-weight: 500;
    font-size: 12px;
    line-height: 1;
    text-align: center;
    color: #74747a;
    margin-bottom: 20px;
  }
  h3 {
    padding: 8px 16px;
    background: #3a3a3d;
    border-radius: 14px;
    font-weight: bold;
    font-size: 12px;
    line-height: 1;
    color: #ffffff;
  }
</style>

<section>
  <h4>{symbol}</h4>
  <h2>{title}</h2>
  <p>{dayjs(date).format('MMM D, YYYY')}</p>
  <h3>{timeFromNow}</h3>
</section>
