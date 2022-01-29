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
        deletePost($(" .dropdown-item-del", newPost));

        // call the create comment class method
        new PostComments(post.data.post._id);
        // call the toggle like class method
        new ToggleLike($(' .toggle-like-button', newPost));

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
                         <p> ${post.user.createdAt} </p>
                     </div>
                 </div>
             </div>
             <div class="col-md-2">
             <a class="dropdown-item-del delete-post-button" href="/users/posts/deletepost/${post._id}"><i class="fas fa-trash-alt"> </i></a>
             
                     
             </div>
             <hr>
         </div>
 
         <div class="row">
             <div class="col-md-12 p-3 text-start">
                 <p class="p-1">${post.content}</p>
             </div>
         </div> 

         
         <div class="row">

            <div class="col-md-12 d-flex">
                <a class="toggle-like-button px-2" data-likes="0" href="/users/posts/likes/toggle/?id=${post._id}&type=post">
                    <i class="fas fa-heart"> 
                        
                    </i> <span id = 'likeNo'>${post.likes.length}</span>
                    Likes
                    
                </a>
                <a class="toggle-like-button px-2" data-comments="0" href="/users/posts/likes/toggle/?id=${post.id}&type=post">
                    <i class="fas fa-comments"> </i> <span id = 'commentNo'>${post.comments.length}</span>
                     Comments
                </a>
            </div>
        </div>

         <div class="post-comments row d-flex align-items-baseline ">
            <div class="col-md-2 ">
                    <img src="${post.user.avatar}" class="rounded-circle" alt="Cinque Terre" width="40" height="40">
            </div>
            <div class="col-md-10">
                    <form id="post-${post._id}-comments-form" action="/users/posts/createcomment" method="POST" class ='d-flex align-items-center'>
                    <textarea class="feed-post" rows="1" name="content"  required placeholder="Write a comment.." style="
                    border: none;
                    background-color: #2c3441;
                    padding: 10px;"></textarea>
                    <input type="hidden" name="postId" value="${post._id}" >
                    <button type = 'submit' class="btn btn-primary post-btn lcsnewer"><i class="fas fa-paper-plane"></i></button>
                  </form>     
            </div>
            <hr>
          </div>
           

          <div  id="post-comments-${post._id}" class="row post-comments-list align-items-center">
                

          </div>
      </div>
      
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

    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each

// method to convert all posts to AJAX responses
let convertPostsToAJAX = function() {
   $(".each-post").each(function() {
      let self = $(this);
      let deleteButton = $(' .delete-post-button', self);
      deletePost(deleteButton);

      let postId = self.prop('id').split('-')[1];

      new PostComments(postId);
      new ToggleLike($(" .toggle-like-button", self));
   });
}


postForm();
convertPostsToAJAX();
