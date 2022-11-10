import { createMachine } from 'xstate';

export const toggleMachine = createMachine({
    id: 'fetch',
    initial: 'loading',
    context: {
      retries: 0
    },
    states: {
      loading: {
        on: {
          RESOLVE: 'success',
          REJECT: 'failure'
        }
      },
      success: {
        type: 'final'
      },
      failure: {
        on: {
          RETRY: {
            target: 'loading',
            actions: "do something"
          }
        }
      }
    }
});
