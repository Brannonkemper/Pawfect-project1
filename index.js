const buddyView =document.getElementById("buddyBtn")
const maxView =document.getElementById("maxBtn")
const bellaView =document.getElementById("bellaBtn")
const charlieView =document.getElementById("charlieBtn")
const daisyView =document.getElementById("daisyBtn")
const lucyView =document.getElementById("lucyBtn")
const rockyView =document.getElementById("rockyBtn")
const mollyView =document.getElementById("mollyBtn")
const baileyView =document.getElementById("baileyBtn")
const lolaView =document.getElementById("lolaBtn")
const cooperView =document.getElementById("cooperBtn")
const rexView =document.getElementById("rexBtn")
const zoeyView =document.getElementById("zoeyBtn")
const leoView =document.getElementById("leoBtn")
const chloeView =document.getElementById("chloeBtn")
const busterView =document.getElementById("busterBtn")
const rubyView =document.getElementById("rubyBtn")
const miloView =document.getElementById("miloBtn")
const pennyView =document.getElementById("pennyBtn")
const finnView =document.getElementById("finnBtn")
const openPopupBtn = document.querySelector('.openPopupBtn');
const closePopupBtn = document.getElementById('closePopupBtn');
const popup = document.getElementById('popup');
// Open the popup when the button is clicked

openPopupBtn.addEventListener('click', function() {
    popup.style.display = 'block';
});

function dogsDisplay(dogsId){

    fetch(`http://localhost:3000/dogs/${dogsId}`)
    .then(res => res.json())
    .then(dogs => {
        
        document.getElementById("Breed").textContent = dogs.breed
        document.getElementById("Paragraph").textContent = dogs.description
        document.getElementById("Age").textContent = dogs.age
    }

    )
    popup.style.display = 'block';



// Close the popup when the close button (X) is clicked
closePopupBtn.addEventListener('click', function() {
    popup.style.display = 'none';
});


window.addEventListener('click', function(event) {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});
}

buddyView.addEventListener("click",() => dogsDisplay(1))
maxView.addEventListener("click",() => dogsDisplay(2))
bellaView.addEventListener("click",() => dogsDisplay(3))
charlieView.addEventListener("click",() => dogsDisplay(4))
daisyView.addEventListener("click",() => dogsDisplay(5))
lucyView.addEventListener("click",() => dogsDisplay(6))
rockyView.addEventListener("click",() => dogsDisplay(7))
mollyView.addEventListener("click",() => dogsDisplay(8))
baileyView.addEventListener("click",() => dogsDisplay(9))
lolaView.addEventListener("click",() => dogsDisplay(10))
cooperView.addEventListener("click",() => dogsDisplay(11))
rexView.addEventListener("click",() => dogsDisplay(12))
zoeyView.addEventListener("click",() => dogsDisplay(13))
leoView.addEventListener("click",() => dogsDisplay(14))
chloeView.addEventListener("click",() => dogsDisplay(15))
busterView.addEventListener("click",() => dogsDisplay(16))
rubyView.addEventListener("click",() => dogsDisplay(17))
miloView.addEventListener("click",() => dogsDisplay(18))
pennyView.addEventListener("click",() => dogsDisplay(19))
finnView.addEventListener("click",() => dogsDisplay(20))

document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('commentForm');
    const commentText = document.getElementById('commentText');
    const commentsSection = document.getElementById('comments');

    // For fetching and displaying comment db.json file
    function loadComments() {
        fetch('http://localhost:3000/comment')
            .then(res => res.json())
            .then(comments => {
                commentsSection.innerHTML = ''; // Clear the section first
                comments.forEach(comment => {
                    displayComment(comment);
                });
            });
    }

    // Display comment in the comments section
    function displayComment(comment) {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment-item');
        commentElement.setAttribute('data-id', comment.id); // Store the id in the DOM element

        commentElement.innerHTML = `
            <p>${comment.text}</p>
            <button class="delete-btn">Delete</button>
        `;

        // Add delete functionality
        const deleteBtn = commentElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteComment(comment.id));

        commentsSection.appendChild(commentElement);
    }

    // Submit a new comment (POST request)
    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const comment = commentText.value.trim();

        if (comment !== "") {
            const newComment = {
                text: comment
            };

            fetch('http://localhost:3000/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newComment)
            })
                .then(res => res.json())
                .then(savedComment => {
                    displayComment(savedComment);
                    commentText.value = ''; 
                })
                .catch(error => console.error('Error adding comment:', error));
        }
    });

    // Delete comment (DELETE request)
    function deleteComment(commentId) {
        fetch(`http://localhost:3000/comment/${commentId}`, {
            method: 'DELETE',
        })
            .then(() => {
                const commentElement = document.querySelector(`.comment-item[data-id='${commentId}']`);
                commentsSection.removeChild(commentElement); // Remove from DOM
            })
            .catch(error => console.error('Error deleting comment:', error));
    }

    loadComments();
});

document.addEventListener('DOMContentLoaded', function() {
    // Array of all add to cart buttons
    const cartButtons = document.querySelectorAll('[id^="addCart"]');

    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the accessory details based on the button clicked
            const accessoryCard = this.closest('.pet-profile');
            const name = accessoryCard.querySelector('h3').textContent;
            const priceText = accessoryCard.querySelector('h5').textContent;
            const price = priceText.match(/\d+/)[0]; // Extract price number from text
            
            
            const quantity = 1; 

            
            const accessoryData = {
                name: name,
                price: price,
                quantity: quantity
            };

            // Send the POST request to the server
            fetch('http://localhost:3000/accessories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(accessoryData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Item added to cart:', data);
                alert(`Added ${name} to the cart!`);
            })
            .catch(error => {
                console.error('Error adding to cart:', error);
                alert('Error adding item to cart. Please try again.');
            });
        });
    });
});
const dogBreeds = ["Labrador", "Beagle", "Bulldog", "Poodle", "Golden Retreiver", "German Shepherd" ,"Dachshund", "Siberian Husky","Boxer","Shihtzu","Cocker Spaniel","Rottweiler","Yorshire Terrier","Great Dane","Chihuahua","Border Collie","Basset Hound","Australian Shepherd","French Bulldog","Irish setter"];

const breedList = dogBreeds.map(breed => `<li>${breed}</li>`).join('');
document.getElementById("breedContainer").innerHTML = `<ul>${breedList}</ul>`;