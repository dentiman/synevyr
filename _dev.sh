#!/usr/bin/env bash
#docker run --rm --interactive --tty  --volume $PWD:/app -w /app  node:20-alpine npm install

# generate a new angular directive
#docker compose run synevyr npx nx generate component calendar-range --directive=synevyr/ui/src/lib/datepicker --project=synevyr-cdk --skipTests --export
# show nx project list
npx nx generate @nx/angular:component  calendar-range \
      --directory=synevyr/ui/src/lib/datepicker/calendar-range \
      --project=synevyr-cdk \
      --skipTests \
      --style=none



