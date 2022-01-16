class PostComments{
    constructor(postId){
        this.postId = postId;
        this.postContainer = $(`#postid-${postId}`); 
        this.newCommentForm = $(`#post-${postId}-comments-form`);  
        
        this.createComment(postId);
        let self = this;
        //call for all existing comments
        
    }

    createComment(postId) {
        let pSelf = this;
        this.newCommentForm.submit(function(e) {
            e.preventDefault();
            console.log('inside comment btn');
            let self = this;

            $.ajax({
                type: 'POST',
                url: '/users/posts/createcomment',
                data: $(self).serialize(),
                success: function(data) {
                    console.log(data);
                    let newComment = pSelf.newCommentDOM(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    console.log("SUCESSS in showing the comment in the DOM");
                    pSelf.deleteComment($(' .dropdown-item-del', newComment));
                    console.log('SUCESSS in deleting the comment');
                },
                error: function(error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    newCommentDOM(comment) {

        return $(`
       <div class="row" id="comment-${comment._id}">
            <div class="col-md-2 align-items-center">
                        <img src="https://cdn.dribbble.com/users/146798/screenshots/6284653/peach-dribbble_4x.jpg?compress=1&resize=1600x1200&vertical=top" class="rounded-circle" alt="Cinque Terre" width="50" height="50">
            </div>

            <div class="col-md-8 text-start"  id="comment-${comment._id}">
                <h6>${comment.user.name}</h6>
                <p>${comment.content}</p>
            </div>

            <div class="col-md-2">
                <div class= "dropdown" >
                <button class="btn btn-secondary dropdown-toggle post-btn" type="button" data-bs-toggle="dropdown" >
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a class="dropdown-item-del" href="/users/posts/deletecomment/${comment._id}">Delete</a></li>
                    </ul>
                </div>     
            </div>
        </div>
        
        `);
    }


    deleteComment(deleteLink) {
        $(deleteLink).click(function(e) {
            e.preventDefault();

            $.ajax({
                type: 'GET',
                url: $(deleteLink).prop('href'),
                success: function(data) {
                    $(`#comment-${data.data.comment_id}`).remove();
                },
                error: function(error) {
                    console.log(error.responseText);
                }
            });
        });
    }
}


// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX

// class PostComments{
//     // constructor is used to initialize the instance of the class whenever a new instance is created
//     constructor(postId){
//         this.postId = postId;
//         this.postContainer = $(`#post-${postId}`);
//         this.newCommentForm = $(`#post-${postId}-comments-form`);

//         this.createComment(postId);

//         let self = this;
//         // call for all the existing comments
//         $(' .delete-comment-button', this.postContainer).each(function(){
//             self.deleteComment($(this));
//         });
//     }


//     createComment(postId){
//         let pSelf = this;
//         this.newCommentForm.submit(function(e){
//             e.preventDefault();
//             console.log('inside comment class');
//             let self = this;

//             $.ajax({
//                 type: 'post',
//                 url: '/users/posts/createcomment',
//                 data: $(self).serialize(),
//                 success: function(data){
//                     let newComment = pSelf.newCommentDom(data.data.comment);
//                     $(`#post-comments-${postId}`).prepend(newComment);
//                     pSelf.deleteComment($(' .delete-comment-button', newComment));

//                     new Noty({
//                         theme: 'relax',
//                         text: "Comment published!",
//                         type: 'success',
//                         layout: 'topRight',
//                         timeout: 1500
                        
//                     }).show();

//                 }, error: function(error){
//                     console.log(error.responseText);
//                 }
//             });


//         });
//     }


//     newCommentDom(comment){
//         // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
//         return $(`
//         <li id="comment-${ comment._id }">
//                         <p>
                            
//                             <small>
//                                 <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
//                             </small>
                            
//                             ${comment.content}
//                             <br>
//                             <small>
//                                 ${comment.user.name}
//                             </small>
//                         </p>    

//                 </li>`);
//     }


//     deleteComment(deleteLink){
//         $(deleteLink).click(function(e){
//             e.preventDefault();

//             $.ajax({
//                 type: 'get',
//                 url: $(deleteLink).prop('href'),
//                 success: function(data){
//                     $(`#comment-${data.data.comment_id}`).remove();

//                     new Noty({
//                         theme: 'relax',
//                         text: "Comment Deleted",
//                         type: 'success',
//                         layout: 'topRight',
//                         timeout: 1500
                        
//                     }).show();
//                 },error: function(error){
//                     console.log(error.responseText);
//                 }
//             });

//         });
//     }
// }