## Mission 2 - Assignment-2

# Live Link: https://m2-assignment2.vercel.app

## Instruction to run the application local

- Step 1: create a `.env` file and include the environment variable as following bellow

  ```bash
    PORT=
    MONGO_URI= #your mongodb connection string or URI
  ```

- Step 2: install all the dependencies using the command
  ```bash
  npm install
  ```
- Step 3: run the development server using the command

  ```bash
  npm run dev
  ```

  or run the production server using the commands

  ```bash
    # at first build the production server
    npm run build

    #then
    npm start
  ```

## Linting and prettier for code formatting commands

```bash
  npm run lint # linting code

  npm run lint:fix # fix linting

  npm run format # formate the code before git commit

  npm run format:fix # fix formatting
```
