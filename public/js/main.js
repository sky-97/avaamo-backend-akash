const socket = io()

var data = ''
socket.on('event', message => {
    console.log(message);
    data = message
})


socket.on("newJob", (job) => {
    console.log('this is new job', job);
    data.push(job)
console.log('updated job', data);

  });

//   socket.on("job", (id) => {
//     const updatedThoughts = data.filter((thought) => {
//       return thought._id !== id;
//     })
// });
