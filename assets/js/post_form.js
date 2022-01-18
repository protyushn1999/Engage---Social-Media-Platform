console.log("connected");

// method to submit the form data for new post using ajax request
let postForm = function () {
  let newPostForm = $("#postfeed");
  newPostForm.submit(function (e) {
    e.preventDefault();

    console.log("inside submit");

    $.ajax({
      type: "POST",
      url: "/users/posts/createpost",
      data: newPostForm.serialize(),
      success: function (post) {
        console.log(post);
        console.log(post.data.post._id);
        let newPost = newPostDOM(post.data.post);

        $("#postArea").prepend(newPost);
        deletePost($(" .dropdown-item", newPost));

        // call the create comment class method
        new PostComments(post.data.post._id);
        // show the notification using Noty
        new Noty({
          theme: 'sunset',
          text: "Post created successfully",
          type: 'success',
          layout: 'bottomRight',
          timeout: 500
          
      }).show();

        console.log(post.data.post._id);
      },
      error: function (err) {
        console.log(err.responseText);
      },
    });
  });
};

// method to show a post on the post page using ajax request
let newPostDOM = function (post) {
  return $(`
  <div class="row each-post" id = 'postid-${post._id}'>
     <div class="col-md-12 ">
         <div class="row">
             <div class="col-md-2">
                 <img src="${post.user.avatar}" class="rounded-circle" alt="Cinque Terre" width="50" height="50">
             </div>
             <div class="col-md-8 text-start">
                 <div class="row">
                     <div class="col-md-12">
                         <h6>${post.user.name}</h6>
                     </div>
                     <div class="col-md-12">
                         <p> ${post.createdAt} </p>
                     </div>
                 </div>
             </div>
             <div class="col-md-2">
                 <div class= "dropdown" >
                         <button class="btn btn-secondary dropdown-toggle post-btn" type="button" data-bs-toggle="dropdown" >
                             <i class="fas fa-ellipsis-h"></i>
                         </button>
                         <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                         <li><a class="dropdown-item" href="/users/posts/deletepost/${post._id}">Delete</a></li>
                         </ul>
                    </div>       
             </div>
             <hr>
         </div>
 
         <div class="row">
             <div class="col-md-12 p-1 text-start">
                 <p class="p-4">${post.content}</p>
             </div>
         </div> 
 
         <hr>

         <div class="d-flex justify-content-center">
             <div class="col-md-4 align-self-center">
                <i class="fas fa-heart"></i>  
             </div>
             <div class="col-md-4">
                <button type="submit" class="btn btn-primary post-btn lcs">Like</button>
             </div>
             <div class="col-md-4">
                <button type="submit" class="btn btn-primary post-btn lcs">Share</button>
             </div> 
         </div>
            <div class="post-comments d-flex align-items-baseline ">
                <div class="col-md-2 ">
                    <img src="${post.user.avatar}" class="rounded-circle" alt="Cinque Terre" width="50" height="50">
                </div>
                <div class="col-md-10">
                    
                                <form id="post-${post._id}-comments-form" action="/users/posts/createcomment" method="POST" class ='d-flex align-items-center'>
                                    <textarea  class="form-control feed-post" rows="1" name="content" placeholder="Write a comment" style="
                                    border: none;
                                    background-color: #c3d3ea" required>
                                    </textarea>
                                    <input type="hidden" name="postId" value="${post._id}" >
                                    <button type = 'submit' class="btn btn-primary post-btn lcsnew">Comment</button>
                                </form>
                       
                </div>
            </div>
            <hr>
            <div  id="post-comments-${post._id}" class="row post-comments-list align-items-baseline d-flex flex-wrap">
                

                </div>
            </div>
        </div>
      </div>
        <br>
 </div>`);
};

// method to delete a post using ajax request

let deletePost = function (deleteLink) {
  $(deleteLink).click(function (e) {
    e.preventDefault();

    $.ajax({
      type: "get",
      url: $(deleteLink).prop("href"),
      success: function (data) {
        $(`#postid-${data.data.post_id}`).remove();
        new Noty({
          theme: 'sunset',
          text: "Posts deleted successfully",
          type: 'success',
          layout: 'bottomRight',
          timeout: 500
          
      }).show();
      },
      error: function (err) {
        console.log(err.responseText);
      },
    });
  });
};

postForm();
