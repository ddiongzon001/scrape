$(function () {

    // this saves the user's preference of what page they want to get anime from
    $("#render").on("click", function () {
        console.log(`this was clicked!`);

        let season = $("#inlineFormCustomSelectPref").val();
        let year = $("#inlineFormCustomSelectPref2").val();

        console.log(season);
        console.log(year);

        $.get(`/scrape/${season}/${year}`, function () {
            console.log("went through this");
        })

        setTimeout(function () { location.reload() }, 5000);
    })

    // this clears out ALL the animes on the main page
    $("#clear").on("click", function () {
        console.log(`thisss was clicked`);
        $.ajax({
            URL: "/",
            method: "DELETE"
        }).then(function () {
            console.log(`everything was deleted`);

        })
        location.reload();
    })

    // 
    $(".fa-sticky-note").on("click", function () {
        let id = $(this).attr("data-id");
        console.log(id);

        $.get(`/anime/${id}`, function (response) {
            console.log(response)
            $(`.title${id}`).val(response.comment.title)
            $(`.body${id}`).val(response.comment.body)
        })
    })

    // this is the on click button for saving the note
    $(document).on("click", "#save", function () {
        console.log(`this was clicked!`);
        let id = $(this).attr(`data-id`);
        // let comment = 
        console.log(id);
        // console.log(comment)
        console.log($(`.title${id}`).val())

        $.ajax({
            method: "POST",
            url: "/anime/" + id,
            data: {
                title: $(`.title${id}`).val(),
                body: $(`.body${id}`).val()
            }
        })
            // With that done
            .then(function (response) {
                // Log the response
                console.log(response);
            });

        location.reload();
    })
});