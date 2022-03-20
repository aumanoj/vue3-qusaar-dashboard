<template>
    <ul class="pagination">
      <li v-if="paginate.current_page > 1">
        <router-link :to="{query: query({page:paginate.current_page-1})}" aria-label="Previous">
          <span aria-hidden="true">Previous</span>
        </router-link>
      </li>
      <li v-for="(page,key) in pagesNumber" :key="key">
        <router-link :to="{query: query({page:page})}" :class="{'active': page == paginate.current_page}">{{page}}</router-link>
      </li>
      <li v-if="paginate.current_page < paginate.last_page">
        <router-link :to="{query: query({page:paginate.current_page+1})}" aria-label="Next">
          <span aria-hidden="true">Next</span>
        </router-link>
      </li>
    </ul>
</template>
<script>
  export default{
      props: {
      paginate: {
          type: Object,
          required: true
      },
      offset: {
          type: Number,
          default: 4
      }
    },
    computed: {
      pagesNumber() {
        if (!this.paginate.to) {
          return [];
        }
        let from = this.paginate.current_page - this.offset;
        if (from < 1) {
          from = 1;
        }
        let to = this.offset;
        if (to >= this.paginate.last_page) {
          to = this.paginate.last_page;
        }
        let pagesArray = [];
        for (let page = from; page <= to; page++) {
          pagesArray.push(page);
        }
          return pagesArray;
      }
    },
    methods : {
      query(newQuery) {
        return {
            ...this.$route.query,
            ...newQuery
        }
      },
    }
  }
</script>
<style>
.pagination {
  display: inline-flex;
  margin: 0px;
  padding: 0px;
  list-style: none;
  margin-top:10px;
}
.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  font-weight: bold;
  border-radius: 50%;
}
.pagination a.active {
  background-color: #1976d2 !important;
  color: white;
}
</style>