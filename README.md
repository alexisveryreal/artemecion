<br>
<p align="center">
<a href="https://github.com/alexisveryreal"><img width="125" src="https://static.wikia.nocookie.net/finalfantasy/images/f/fc/Ff9_artemicion.jpg/revision/latest?cb=20111201184121" alt="Artemicion"></a>
</p>

<br>

# Artemecion

[Artemecion](https://finalfantasy.fandom.com/wiki/Artemicion#Final_Fantasy_IX) is a bill/subscription project, meant to help you keep track of all your bills and when they need to be paid


# Stack
- [T3 Stack](https://create.t3.gg/)
- [Neon](https://neon.tech/home)
- [React Hook Form](https://react-hook-form.com/)


# Showcase

![image](https://user-images.githubusercontent.com/44214923/218876036-87333928-af36-4813-9143-b0105e554a56.png)

- Discord Authentication with [NextAuth](https://next-auth.js.org/)

![image](https://user-images.githubusercontent.com/44214923/218876213-71103e4b-79ce-4167-8973-f753c2f9a391.png)

- Dashboard to track your bills

![image](https://user-images.githubusercontent.com/44214923/218876315-45909d2a-f609-4417-b31a-32e686d84c8b.png)

- Form to create a new bill built with TailwindCSS and [Headless UI](https://headlessui.com/), form validation powered by [react-hook-form](https://react-hook-form.com/)

![image](https://user-images.githubusercontent.com/44214923/218876615-9eb5bcda-8e83-4b9f-b0fc-caa5d0e2f4c2.png)

![image](https://user-images.githubusercontent.com/44214923/218876908-76c28c26-beb3-4534-9f26-8b7c6bc7b7ac.png)

- Edit bills which will pre-populate form with saved inputs, and clicking on "Reset" will revert back to original inputs.

![image](https://user-images.githubusercontent.com/44214923/218877169-a09c7af9-bb43-4ea7-9801-f505cf92d1ab.png)






## Running Locally


### Dependencies
```sh
npm i
```

### Environment Variables
```sh
cp .env.example .env
```


### Usage
```sh
npx prisma db push
npm run dev
```

## License

This application is licensed under the [Apache-2.0 license](https://github.com/alexisveryreal/artemecion/blob/main/LICENSE). If you're copying this website just let me know.

## Plans
- I was originally planning on making this some time of service where it would email the users to remind them that their bill is due soon, but I didn't want to add to the email bloat that we are all accustomed to.
- I am thinking of displaying some charts in the future however possibly to see how your spending may look like a year from now with current subscriptions, etc.