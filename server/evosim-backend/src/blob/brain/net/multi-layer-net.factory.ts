import { MultiLayerNetEntity } from './multi-layer-net.entity';
import { ActivationStrategy } from './nodes/activation/activation.strategy';
import { BlobSenses } from '../../blob-senses.entity';
import { BlobActions } from '../../blob-actions.entity';
import { SigmoidActivationStrategy } from './nodes/activation/sigmoid-activation.strategy';

export class MultiLayerNetFactory {
  private static readonly DEFAULT_ACTIVATION_STRATEGY =
    new SigmoidActivationStrategy();

  public static newEmptyMultiLayerNet(
    activationStrategy?: ActivationStrategy,
  ): MultiLayerNetEntity {
    const net = new MultiLayerNetEntity();
    if (activationStrategy !== undefined) {
      net.activationStrategy = activationStrategy;
    } else {
      net.activationStrategy = MultiLayerNetFactory.DEFAULT_ACTIVATION_STRATEGY;
    }
    return net;
  }

  public static newMultiLayerNet(
    hiddenSchema: Array<number>,
    activationStrategy?: ActivationStrategy,
  ): MultiLayerNetEntity {
    const net = MultiLayerNetFactory.newEmptyMultiLayerNet(activationStrategy);
    net.initializeNetDetail(
      BlobSenses.count(),
      BlobActions.count(),
      hiddenSchema,
    );
    return net;
  }
}
