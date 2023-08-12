<template>
  <div>
    <div class="rounded-lg border border-[#00DC82] px-3 py-4">
      <div>
        <label
          for="message"
          class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
          >Enter link</label
        >
        <textarea
          id="message"
          rows="6"
          class="block p-2.5 w-full placeholder:text-xl text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here... 😀"
          v-model="link"
        ></textarea>
      </div>
      <div class="mt-5 w-full">
        <button
          type="button"
          class="text-white block w-3/4 mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          @click="sendLink"
        >
          Send
        </button>
      </div>
    </div>
    <div class="rounded-lg border border-blue-600 px-3 py-4 mt-6">
      <label
        for="message"
        class="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
        >Response</label
      >
      <pre class="py-4"><code language="javascript">{{ response }}</code></pre>

      <div class="flex gap-x-4">
        <button
          type="button"
          class="text-white block bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-12 py-2.5 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          @click="clearResponse"
        >
          Tap to clear response
        </button>
        <button
          type="button"
          class="text-white block bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-12 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          @click="highlightResponse"
        >
          Tap to highlight response
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import "highlight.js/scss/stackoverflow-light.scss";

export default defineNuxtComponent({
  name: "HomePage",
  setup() {
    const link = ref("Test content");
    const $hljs = useNuxtApp().$hljs;
    const response = ref({
      data: {},
      pending: {},
      error: {},
      status: "",
    });

    onMounted(() => {
      highlightResponse();
    });

    async function sendLink() {
      if (!String(link.value)) {
        alert("Input is blank!");
        return;
      }
      if (!confirm("Please confirm sending link")) return;

      const rsp = await useFetch("/api/sendevent", {
        method: "POST",
        body: {
          link,
        },
      });

      response.value = rsp;
      highlightResponse();
    }

    function highlightResponse() {
      setTimeout(() => {
        document.querySelectorAll("pre code").forEach((el) => {
          $hljs.highlightElement(el);
        });
      });
    }

    function clearResponse() {
      if (!confirm("Reset response value ??")) return;

      response.value = {
        data: {},
        pending: {},
        error: {},
        status: "",
      };

      highlightResponse();
    }

    return {
      link,
      response,
      sendLink,
      clearResponse,
      highlightResponse,
    };
  },
});
</script>
