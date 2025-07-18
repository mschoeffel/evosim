# evosim
Repository for my bachelor thesis: Visualization of artificial neural networks using a web-based, simplified evolution simulation.

## Update 🥳🙌
The code of the main branch is frozen because it is part of a research project and has to stay in its original form.
You can read more about the project and my bachelor thesis on my personal website: [Personal Website](https://mschoeffel.de).

**However**, **I updated the code in July 2025** to be compatible with the latest version of Node.Js, Nuxt.Js, and other dependencies. The code is now available in the `next` branch.
I also improved the NEAT algorithm and the visualization of the neural networks. The new code is free to use and deployed on my website: [Evosim](https://evosim.mschoeffel.ned).
You can check out the branch using this link: [Next Branch](https://github.com/mschoeffel/evosim/tree/next)

The updated code is not part of my thesis, but I hope it will be useful for others who want to learn about neural networks and evolution simulation.
Prebuild Docker containers are available on Docker Hub with the ending tag "-next": [Docker Repository](https://hub.docker.com/repository/docker/mschoeffel/evosim/general)

## Docker
Prebuild images ready to start can be found here: [Docker Repository](https://hub.docker.com/repository/docker/mschoeffel/evosim)

### Docker Compose
To start everything using docker compose simply use the command `docker-compose --env-file ./compose.env up --build --force-recreate --no-deps --remove-orphans -d`.

## Contribution
Contributions will be open after my thesis is finished. Approximately end of May. Until then the code is frozen and no issue or pull request will be done!

Github Discussions is enabled if you got any questions or ideas: [Go](https://github.com/mschoeffel/evosim/discussions)
