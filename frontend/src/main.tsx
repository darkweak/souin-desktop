import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import { Navbar } from '@/components/layout';
import { Route, Router, Switch } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import { Content } from '@/components/layout/content';
import Instance from '@/page/instance';
import CreateInstance from '@/page/createInstance';
import { InstanceProvider } from '@/context';
import { QueryClient, QueryClientProvider } from 'react-query';

const container = document.getElementById('root');
const root = createRoot(container!);
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <InstanceProvider>
      <Router hook={useHashLocation}>
        <Navbar />
        <Content>
          <QueryClientProvider client={queryClient}>
            <Switch>
              <Route path="/instances" component={CreateInstance} />
              <Route path="/instances/:instance" component={({ params }) => <Instance {...params} />} nest />

              {/* Default route in a switch */}
              <Route>
                <div className="flex gap-4 py-32">
                  <h1 className="mx-auto text-4xl font-black text-center drop-shadow">
                    Welcome on the Souin desktop app.
                    <br />
                    Create or select an instance using the menu on the top right.
                  </h1>
                </div>
              </Route>
            </Switch>
          </QueryClientProvider>
        </Content>
      </Router>
    </InstanceProvider>
  </React.StrictMode>,
);
