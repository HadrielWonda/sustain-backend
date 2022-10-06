const recipeList = {
    "offset": 0,
    "number": 2,
    "results": [
        {
            "id": 716429,
            "name": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
            "imageURL": "https://spoonacular.com/recipeImages/716429-312x231.jpg",
            "totalTime": "30 minutes"
        },
        {
            "id": 716429,
            "name": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
            "imageURL": "https://spoonacular.com/recipeImages/716429-312x231.jpg",
            "totalTime": "30 minutes"
        }
    ],
    "totalResults": 86
}

const mealPlan = {
    "id": 14428,
    "userID": 4593494,
    "days": [
        {
            "day": "1",
            "items": [
                {
                    "id": 716429,
                    "name": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
                    "imageURL": "https://spoonacular.com/recipeImages/716429-312x231.jpg",
                    "mealType": "breakfast"
                },
                {
                    "id": 716429,
                    "name": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
                    "imageURL": "https://spoonacular.com/recipeImages/716429-312x231.jpg",
                    "mealType": "lunch"
                },
                {
                    "id": 716429,
                    "name": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
                    "imageURL": "https://spoonacular.com/recipeImages/716429-312x231.jpg",
                    "mealType": "dinner"
                },
            ]
        },
        {
            "day": "2",
            "items": [
                {
                    "id": 716429,
                    "name": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
                    "imageURL": "https://spoonacular.com/recipeImages/716429-312x231.jpg",
                    "mealType": "breakfast"
                },
                {
                    "id": 716429,
                    "name": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
                    "imageURL": "https://spoonacular.com/recipeImages/716429-312x231.jpg",
                    "mealType": "lunch"
                },
                {
                    "id": 716429,
                    "name": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
                    "imageURL": "https://spoonacular.com/recipeImages/716429-312x231.jpg",
                    "mealType": "dinner"
                },
            ]
        },
    ]
}

const shoppingList = {
    "aisles": [
        {
            "aisle": "Seasoning",
            "items": [
                {
                    "name": "olive oil",
                    "measures": {
                        "metric": {
                            "amount": 364.0,
                            "unit": "ml"
                        },
                        "us": {
                            "amount": 12.4,
                            "unit": "fl oz"
                        }
                    },
                    "pantryItem": true,
                    "aisle": "Pantry Items",
                    "cost": 333.55,
                    "ingredientId": 4053
                }
            ]
        },
        {
            "aisle": "Meat",
            "items": [
                {
                    "name": "tomatoes",
                    "measures": {
                        "metric": {
                            "amount": 3044.4,
                            "unit": "g"
                        },
                        "us": {
                            "amount": 6.8,
                            "unit": "lb"
                        }
                    },
                    "pantryItem": false,
                    "aisle": "Produce",
                    "cost": 532.21,
                    "ingredientId": 11529
                }
            ]
        }
    ],
    "cost": 1326.62
}

const signUpBody = {
    "first_name": "Joseph",
    "last_name": "Anya",
    "email": "joseph@lifebox.ng",
    "password": "randompass",
    "phone_number": "7081474185",
    "country_code": "+234",
    "gender": "male",
    "dob": "1998-05-09",
    "state": "Lagos",
    "country": "Nigeria",
    "diagnosis": ["Type 2 diabetes", "Hypertension"],
    "role": "patient"
}

const loginBody = {
    "first_name": "Joseph",
    "last_name": "Anya",
    "email": "joseph@lifebox.ng",
    "password": "randompass",
}

const resetPassBody = {
    "email": "joseph@lifebox.ng",
}

const newPassBody = {
    "reset_token": "45402097e9b2c1687bf241a4b88729d256dc67f040fe89aba030ab8590913f79",
    "email": "joseph@lifebox.ng",
    "password": "newpassword"
}