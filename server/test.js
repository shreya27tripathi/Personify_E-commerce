body: {
    sort: [
      {
        mag: {
          order: passedSortOption,
        },
      },
    ],
    size: 300,
    query: {
      bool: {
        filter: [
 
          {
            range: {
              price: {
                lte: passedPrice,
              },
            },
          },
          {
            multi_match: {
              query: passedSearch,
              fields: [
                "brand^2",
                "colour ^2",
                "description",
                "name^2",
               
              ]
            }
          },
        ],
      },
    },
  },
});//search query ends here

body: {
  sort: [
    {
      price: {
        order: passedSort,
      },
    },
  ],
  size:300,
  query: {
    bool: {
      filter: [

        {
          range: {
            price: {
              lte: passedPrice,
            },
          },
        },
        {
          multi_match: {
            query: passedSearch,
            fields: [
              "brand^2",
              "colour ^2",
              "description",
              "name^2",
             
            ]
          }
        },
        {
          match: { brand: passedBrand },
        },
        {
          match:{colour:passedColor}
        },
      ],
    },
  }
}
});

