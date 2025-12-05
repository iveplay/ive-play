import { ReactNode } from 'react';
import { IconRocket } from '@tabler/icons-react';
import { Anchor, Box, Flex, Grid, Image, Text, Title } from '@mantine/core';
import handyConnect from '@/assets/handy-connect.jpg';
import intifaceConnect from '@/assets/intiface-connect.jpg';
import eroscripts from '@/assets/ive-eroscripts.jpg';

export const GettingStarted = () => {
  return (
    <Box component="section" id="getting-started" mb="md">
      <Grid gutter="md">
        <Grid.Col span={{ base: 0, md: 1, xl: 2 }} display={{ base: 'none', md: 'block' }}>
          <div className="box w h" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 10, xl: 8 }}>
          <div>
            <Flex
              className="box w h"
              align="center"
              direction="column"
              p={{ base: '32px', md: '64px' }}
            >
              <IconRocket size={48} />
              <Title order={2} size={32} ta="center" my="md" fw={300} ff="var(--font-frankfurter)">
                Getting started
              </Title>
              <Text size="lg" ta="center" maw={720}>
                This is a step by step guide to get you started with IVE. Follow these instructions
                to install the extension, connect your device and start enjoying synchronized haptic
                feedback with your videos.
              </Text>
            </Flex>
            <Step number={1} title="Install">
              <Text pb="sm">
                Download the extension for your preferred browser from the{' '}
                <Anchor href="/#download" target="_blank" fw={700}>
                  download section
                </Anchor>
                .
              </Text>
              <Text>
                For Chrome based browsers you need to directly install it from the crx file. To do
                this follow these steps:
                <ul>
                  <li>
                    Go to{' '}
                    <Anchor href="chrome://extensions" target="_blank" fw={700}>
                      chrome://extensions
                    </Anchor>{' '}
                    or open the extensions menu in your browser and click on manage extensions.
                  </li>
                  <li>Enable developer mode at the top right and reload the extensions page.</li>
                  <li>Drag and drop the crx file to install the extension.</li>
                </ul>
              </Text>
            </Step>
            <Step number={2} title="Connecting your device" />
            <Step title="Connect The Handy" imageUrl={handyConnect.src}>
              <Text>
                Get the connection key from the Handy app after setting up your device. Open IVE by
                clicking on the IVE extension. On the Handy page enter the key and click connect.
              </Text>
              <Text mt="md" fw={500}>
                Only handy version FW4 is supported!
              </Text>
              <Text mt="md">
                After a successful connection it should show connected with some handy device
                settings for stroke range and timing offset.
              </Text>
            </Step>
            <Step title="or Connect Intiface" imageUrl={intifaceConnect.src} imageLeft>
              <Text>
                Download and install{' '}
                <Anchor href="https://intiface.com" target="_blank" fw={700}>
                  Intiface
                </Anchor>{' '}
                on your computer. Open Intiface and connect your device. Make sure the Intiface
                server is running. Open the IVE popup in your browser and go to the Intiface page.
                Fill in the connection details and click connect.
              </Text>
              <Text mt="md">
                After a successful connection your device should show up in the device list. With
                some device settings if there are any.
              </Text>
            </Step>
            <Step number={3} title="Playing scripts">
              IVE plays scripts directly sites, but the scripts need to come from somewhere. IVE can
              load scripts from{' '}
              <Anchor href="https://ivdb.io" target="_blank" fw={700}>
                IVDB
              </Anchor>
              ,{' '}
              <Anchor href="https://faptap.net" target="_blank" fw={700}>
                FapTap
              </Anchor>
              ,{' '}
              <Anchor href="https://www.funscripthub.com" target="_blank" fw={700}>
                FunScriptHub
              </Anchor>{' '}
              and{' '}
              <Anchor href="https://eroscripts.com" target="_blank" fw={700}>
                EroScripts
              </Anchor>
              . More details on how they work below.
            </Step>
            <Step title="Eroscripts" imageUrl={eroscripts.src}>
              <Text>
                Eroscripts is a forum and community for sharing and discussing scripts. To play
                scripts from Eroscripts find and open a{' '}
                <Anchor
                  href="https://discuss.eroscripts.com/c/scripts/free-scripts"
                  target="_blank"
                  fw={700}
                >
                  free scripts
                </Anchor>{' '}
                detail page.
              </Text>
              <Text mt="md">
                If IVE is installed you can see an IVE block and select scripts from the list and
                play them with IVE. It then opens the video page, attaches the script and starts
                playing it.
              </Text>
              <Text mt="md">
                You can also right click links on the site to select them in the IVE block. And you
                can also drag and drop link on the selects in the block.
              </Text>
            </Step>
            <Step title="IVDB">
              <Text>
                IVDB is a large database of scripts for made by and for the handy. To play scripts
                from IVDB simply open a video page and click the IVE icon in the top right.
              </Text>
              <Text mt="md" fw={500} w="100%" ta="center">
                Note: IVDB only works with The Handy!
              </Text>
            </Step>
            <Step title="FapTap">
              <Text>
                FapTap is a site for browsing and playing videos with scripts. To play scripts from
                FapTap simply browse the videos and click the IVE icon of a video card. Or go to the
                detail and click the IVE icon below the video.
              </Text>
            </Step>
            <Step title="FunScriptHub" imageUrl={eroscripts.src} imageLeft>
              <Text>
                FunScriptHub is a site for browsing scripts. Altough not that active anymore. Most
                scripts are also on Eroscripts. To play scripts, find a video and you will see the
                same IVE block as on Eroscripts. Select a script and it will open the video page,
                attach the script and start playing it.
              </Text>
            </Step>
            <Step number={4} title="Enjoy!" />
          </div>
        </Grid.Col>
        <Grid.Col span={{ base: 0, md: 1, xl: 2 }} display={{ base: 'none', md: 'block' }}>
          <div className="box w h" />
        </Grid.Col>
      </Grid>
    </Box>
  );
};

const Step = ({
  number,
  title,
  imageUrl,
  children,
  imageLeft = false,
}: {
  number?: number;
  title: string;
  imageUrl?: string;
  children?: ReactNode;
  imageLeft?: boolean;
}) => {
  return (
    <Flex
      mt="md"
      gap="md"
      direction={{
        base: 'column',
        md: imageLeft ? 'row-reverse' : 'row',
      }}
      id={title.replaceAll(' ', '-')}
    >
      <Flex className="box w" direction="column" p="32" gap="md">
        <Title order={3} size="28" fw="400" ta="center" ff="var(--font-frankfurter)">
          {!!number && `${number}. `}
          {title}
        </Title>
        {children && (
          <Text size="lg" mt="xs" w="100%">
            {children}
          </Text>
        )}
      </Flex>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          radius="lg"
          maw={{
            base: '100%',
            md: 480,
          }}
          h={{ base: '320', md: 'auto' }}
          fit="contain"
          bg="var(--mantine-color-dark-6)"
          style={{ contain: 'size' }}
        />
      )}
    </Flex>
  );
};
