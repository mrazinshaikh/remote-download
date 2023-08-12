import Pusher from "pusher";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);

  const response = {
    success: true,
    data: {},
    message: "Sent successfully",
  };

  try {
    const pusher = new Pusher({
      appId: "1650566",
      key: "c66a51ef89662c15ede5",
      secret: "7ca8700fc9fabbfc5756",
      cluster: "ap2",
      useTLS: true,
    });

    const rsp = await pusher.trigger("download-channel", "download-event", {
      message: body.link,
    });

    response.data = rsp.statusText;
  } catch (e) {
    response.message = "something went wrong!!: " + e.message;

    throw createError({
      statusCode: 400,
      message: response.message,
      data: response,
    });
  }

  return response;
});
