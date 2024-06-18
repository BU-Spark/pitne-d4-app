FROM fedora

RUN dnf -y install python3 pip

CMD ["/bin/bash"]