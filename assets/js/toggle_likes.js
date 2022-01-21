

class ToggleLike{
    constructor(toggleElement) {
        this.toggler = toggleElement;
        this.toggleLike();
    }


    toggleLike(){
        $(this.toggler).click(function(e) {
            e.preventDefault();
            let self = this;

            console.log('inside toggle like');


            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
            .done(function(data){
                console.log('data', data);
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);

                console.log("no of likes",data.data.deleted);
                $(' #likeNo', self).text(data.data.deleted);

                // if (data.data.deleted == true){
                //     likesCount -= 1;
                    
                // }else{
                //     likesCount += 1;
                // }

                // $(self).attr('data-likes', likesCount);
                // $(self).html(`${likesCount} Likes`);
            })
            .fail(function(errData){
                console.log(errData.responseText);
            })

        });
    }



}