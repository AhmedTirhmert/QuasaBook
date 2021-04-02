import moment from "moment";
export default {
  filters: {
    carbonJs(date) {
      return moment(date).fromNow();
    }
  }
};
