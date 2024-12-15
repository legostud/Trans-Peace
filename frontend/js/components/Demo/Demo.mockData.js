import { faker } from "@faker-js/faker";
export default {
  title: "Frontend Starter Demo Component",
  description:
    "Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. In consectetuer turpis ut velit. Ut varius tincidunt libero. Fusce neque. Ut non enim eleifend felis pretium feugiat.",
  theme: "Dark",
  imgSrc: faker.image.urlLoremFlickr({ category: "city" }),
  imgAlt: faker.location.city(),
  lazy: true,
  paddingTop: "Large",
  paddingBottom: "Large",
};
