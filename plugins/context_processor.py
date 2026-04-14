"""
Context processor plugin to inject EXTRA_CONTEXT into all templates.
"""

from pelican import signals


def inject_context(generator, **kwargs):
    """
    Inject EXTRA_CONTEXT into the generator's context.
    """
    extra_context = generator.settings.get('EXTRA_CONTEXT', {})
    generator.context.update(extra_context)


def register():
    """
    Register the plugin with Pelican.
    """
    signals.generator_init.connect(inject_context)
